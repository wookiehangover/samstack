# Job queue

Synthetic evaluation fixture. A coordinator process owns the queue and forks worker processes that run jobs.

Jobs are retried if a worker crashes: the coordinator puts the crashed worker's job back on the queue right away.

Run the queue test with `node test/queue.test.mjs`.
