export class Dest {
  constructor() {
    this.writes = [];
    this.tail = Promise.resolve();
  }

  write(row) {
    this.writes.push(row.id);
  }

  withLock(task) {
    const run = this.tail.then(task);
    this.tail = run.catch(() => {});
    return run;
  }
}
