#!/usr/bin/env bash
# Build the synthetic "billing client" repository used by the history trial.
# Usage: build.sh <empty-destination-directory>
set -euo pipefail

dest=${1:?usage: build.sh <destination>}
mkdir -p "$dest"
if [ -n "$(ls -A "$dest")" ]; then
  echo "destination is not empty: $dest" >&2
  exit 1
fi
cd "$dest"
git init -q -b main

commit() {
  local date=$1 author=$2
  shift 2
  git add -A
  local email="${author// /.}@example.test"
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" \
    GIT_AUTHOR_NAME="$author" GIT_COMMITTER_NAME="$author" \
    GIT_AUTHOR_EMAIL="$email" GIT_COMMITTER_EMAIL="$email" \
    git -c commit.gpgsign=false commit -q "$@"
}

mkdir -p lib docs
cat > README.md <<'EOF'
# billing-client

Synthetic evaluation fixture. Thin client for the billing provider's HTTP API.
EOF
cat > lib/http.js <<'EOF'
const RETRIES = 5;
const TIMEOUT_MS = 8000;

async function request(send, req) {
  let lastError;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      return await send(req, { timeout: TIMEOUT_MS });
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

module.exports = { request, RETRIES };
EOF
commit 2025-02-03T10:00:00Z "Priya Raman" -m "Add billing http client"

cat > lib/invoice.js <<'EOF'
const { request } = require('./http');

function createInvoice(send, customer, lines) {
  return request(send, { method: 'POST', path: '/invoices', body: { customer, lines } });
}

module.exports = { createInvoice };
EOF
commit 2025-02-10T15:30:00Z "Marco Diaz" -m "Add invoice creation"

cat > lib/refund.js <<'EOF'
const { request } = require('./http');

function refund(send, invoiceId, cents) {
  return request(send, { method: 'POST', path: `/invoices/${invoiceId}/refunds`, body: { cents } });
}

module.exports = { refund };
EOF
commit 2025-02-24T09:10:00Z "Dana Okoye" -m "Add refunds"

cat > docs/setup.md <<'EOF'
# Setup

Set BILLING_API_KEY. One key is shared by all tenants.
EOF
commit 2025-03-05T11:45:00Z "Marco Diaz" -m "docs: setup notes"

mkdir -p docs/incidents
sed -i 's/const RETRIES = 5;/const RETRIES = 3;/' lib/http.js
cat > docs/incidents/2025-03-14-billing-lockout.md <<'EOF'
# 2025-03-14 billing lockout

- 14:02 A malformed refund request started failing with 401 from the provider.
- 14:02 The client retried it. One request made six calls.
- 14:03 The provider locked our API key. It locks a key for 30 minutes after five failed calls in a row.
- 14:03 to 14:33 Every tenant's billing calls failed, because all tenants share the key.

## Actions

- Keep the total number of calls for one request under five. Done on 2025-03-18.
- Ask the provider whether the lockout can be scoped per tenant. Open.
EOF
commit 2025-03-18T13:20:00Z "Priya Raman" -m "Fix billing outage follow-up" -m "The provider locks an API key for 30 minutes after five failed calls in a
row. With five retries, one bad request made six calls and locked the key
for every tenant. See docs/incidents/2025-03-14-billing-lockout.md.

One call plus three retries is four calls, which stays under the limit."

cat > lib/customer.js <<'EOF'
const { request } = require('./http');

function getCustomer(send, id) {
  return request(send, { method: 'GET', path: `/customers/${id}` });
}

module.exports = { getCustomer };
EOF
commit 2025-04-08T10:05:00Z "Dana Okoye" -m "Add customer lookup"

cat >> docs/setup.md <<'EOF'

Use the sandbox host for local development.
EOF
commit 2025-04-22T16:15:00Z "Marco Diaz" -m "docs: mention sandbox host"

mkdir -p src
git mv lib/http.js src/client.js
git mv lib/invoice.js src/invoice.js
git mv lib/refund.js src/refund.js
git mv lib/customer.js src/customer.js
sed -i 's/RETRIES/RETRY_LIMIT/g' src/client.js
sed -i "s#require('./http')#require('./client')#" src/invoice.js src/refund.js src/customer.js
commit 2025-06-02T09:00:00Z "Marco Diaz" -m "refactor: move sources into src and tidy names"

cat > src/subscription.js <<'EOF'
const { request } = require('./client');

function cancel(send, id) {
  return request(send, { method: 'DELETE', path: `/subscriptions/${id}` });
}

module.exports = { cancel };
EOF
commit 2025-07-15T14:40:00Z "Priya Raman" -m "Add subscription cancel"

sed -i 's/const TIMEOUT_MS = 8000;/const TIMEOUT_MS = 3000;/' src/client.js
sed -i '1i // Keep retries low so p99 latency stays bounded.' src/client.js
commit 2025-09-10T12:00:00Z "Dana Okoye" -m "perf: tighten client timeout for p99" -m "Checkout p99 could reach 32s in the worst case (8s timeout, four calls).
Drop the timeout to 3s. Retries were already kept low for this reason."

cat > src/health.js <<'EOF'
const { request } = require('./client');

function ping(send) {
  return request(send, { method: 'GET', path: '/health' });
}

module.exports = { ping };
EOF
commit 2025-10-06T08:20:00Z "Marco Diaz" -m "Add health check"

cat > docs/provider-notes.md <<'EOF'
# Provider notes

2025-11-18 call with the provider: their v3 API replaces the key lockout with per-request 429 responses. We are still on v2. The v3 migration is not scheduled.
EOF
commit 2025-11-20T17:30:00Z "Marco Diaz" -m "docs: notes from provider call"

echo "built $(git rev-list --count HEAD) commits in $dest"
