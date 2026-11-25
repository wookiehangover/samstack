export class Source {
  constructor(rows) {
    this.rows = rows.map(row => ({ ...row }));
  }

  // Stalest rows first, so a long-unsynced row is never starved.
  page(offset, limit) {
    return [...this.rows]
      .sort((a, b) => a.syncedAt - b.syncedAt || a.id - b.id)
      .slice(offset, offset + limit)
      .map(row => ({ ...row }));
  }

  markSynced(id, at) {
    this.rows.find(row => row.id === id).syncedAt = at;
  }
}
