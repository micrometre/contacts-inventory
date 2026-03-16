import { sqlite3Worker1Promiser } from '@sqlite.org/sqlite-wasm';

export class SQLiteDB {
  constructor() {
    this.promiser = null;
    this.dbId = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    // Use sqlite3Worker1Promiser to set up the worker and OPFS
    this.promiser = await new Promise((resolve) => {
      const _promiser = sqlite3Worker1Promiser({
        onready: () => resolve(_promiser),
      });
    });

    // Open connection to an OPFS-backed database
    const response = await this.promiser('open', {
      filename: 'file:contacts-inventory.sqlite3?vfs=opfs',
    });
    this.dbId = response.dbId;

    // Create tables
    await this.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT
      )
    `);

    await this.exec(`
      CREATE TABLE IF NOT EXISTS inventory (
        id TEXT PRIMARY KEY,
        contactId TEXT,
        name TEXT,
        qty INTEGER,
        date TEXT,
        notes TEXT,
        returned INTEGER,
        returnDate TEXT,
        FOREIGN KEY (contactId) REFERENCES contacts(id) ON DELETE CASCADE
      )
    `);

    await this.exec(`
      CREATE TABLE IF NOT EXISTS user_info (
        key TEXT PRIMARY KEY,
        name TEXT,
        email TEXT
      )
    `);

    this.initialized = true;
  }

  async exec(sql, bind = []) {
    const results = [];
    await this.promiser('exec', {
      dbId: this.dbId,
      sql,
      bind,
      rowMode: 'object',
      callback: (result) => {
        if (result.row) {
          results.push(result.row);
        }
      },
    });
    return results;
  }

  // --- CRUD Operations ---

  async getContacts() {
    return await this.exec('SELECT * FROM contacts');
  }

  async getInventoryMap() {
    const items = await this.exec('SELECT * FROM inventory ORDER BY rowid DESC'); // preserve insertion-ish order
    const map = {};
    for (const item of items) {
      if (!map[item.contactId]) map[item.contactId] = [];
      map[item.contactId].push(item);
    }
    return map;
  }

  async getUserInfo() {
    const res = await this.exec("SELECT * FROM user_info WHERE key='default'");
    if (res.length > 0) return { name: res[0].name, email: res[0].email };
    return { name: '', email: '' };
  }

  async saveUserInfo(info) {
    await this.exec(
      'INSERT INTO user_info (key, name, email) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET name=excluded.name, email=excluded.email',
      ['default', info.name || '', info.email || '']
    );
  }

  async saveContact(c) {
    await this.exec(
      'INSERT OR REPLACE INTO contacts (id, name, email, phone) VALUES (?, ?, ?, ?)',
      [c.id, c.name, c.email || '', c.phone || '']
    );
  }

  async saveMultipleContacts(contacts) {
    // A simple loop for multiple saves. Transactions could improve performance if needed.
    for (const c of contacts) {
      await this.saveContact(c);
    }
  }

  async addInventoryItem(item) {
    await this.exec(
      'INSERT INTO inventory (id, contactId, name, qty, date, notes, returned, returnDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        item.id,
        item.contactId,
        item.name,
        item.qty,
        item.date || '',
        item.notes || '',
        item.returned || 0,
        item.returnDate || '',
      ]
    );
  }

  async deleteInventoryItem(id) {
    await this.exec('DELETE FROM inventory WHERE id=?', [id]);
  }

  async returnInventoryItem(id, returned, returnDate) {
    await this.exec(
      'UPDATE inventory SET returned=?, returnDate=? WHERE id=?',
      [returned, returnDate, id]
    );
  }

  async clearDatabase() {
      // Useful for sign-out functionality
      await this.exec('DELETE FROM inventory');
      await this.exec('DELETE FROM contacts');
      await this.exec('DELETE FROM user_info');
  }

  async isEmpty() {
      const contactsCount = await this.exec('SELECT COUNT(*) as count FROM contacts');
      return contactsCount[0].count === 0;
  }
}

export const db = new SQLiteDB();
