# Replace the fixed-window limiter with a token bucket

Synthetic evaluation fixture. The change described here is already applied in this directory.

## Intended behavior

- Each client has a bucket that holds up to `capacity` tokens and starts full.
- Tokens accrue continuously at `refillPerSec` per second, up to `capacity`.
- A request with cost `c` is admitted when the bucket holds at least `c` tokens, and then spends them.
- A client that sends faster than its refill rate is throttled to that rate, not blocked: once enough tokens have accrued it is admitted again.
- Costs come from the route table in `src/routes.mjs`.

Production settings: `capacity: 10`, `refillPerSec: 1`.

## Testing

`node test/limiter.test.mjs` passes.
