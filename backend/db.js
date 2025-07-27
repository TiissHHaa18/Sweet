const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./sweetshop.db', (err) => {
  if (err) console.error('DB error:', err.message);
  else console.log('Connected to SQLite database.');
});

// ✅ Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS sweets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL
)`);

module.exports = db;
