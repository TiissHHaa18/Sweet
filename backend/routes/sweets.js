const express = require('express');
const db = require('../db');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// ✅ GET /api/sweets
router.get('/', verifyToken, (req, res) => {
  db.all('SELECT * FROM sweets', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ POST /api/sweets
router.post('/', verifyToken, (req, res) => {
  const { name, price, quantity } = req.body;
  const query = 'INSERT INTO sweets (name, price, quantity) VALUES (?, ?, ?)';
  db.run(query, [name, price, quantity], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, price, quantity });
  });
});

module.exports = router;
