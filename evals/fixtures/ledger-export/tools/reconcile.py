#!/usr/bin/env python3
"""Month-end check: compare a ledger file's total with the bank statement total."""
import json
import sys


def ledger_total(path):
    total = 0
    with open(path) as handle:
        for line in handle:
            if line.strip():
                total += json.loads(line).get("amount_cents", 0)
    return total


if __name__ == "__main__":
    path, statement_cents = sys.argv[1], int(sys.argv[2])
    total = ledger_total(path)
    print(f"ledger={total} statement={statement_cents} diff={total - statement_cents}")
    sys.exit(0 if total == statement_cents else 1)
