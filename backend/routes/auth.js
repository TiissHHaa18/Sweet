const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // In-memory users. Replace with DB if needed

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).json({ error: 'User exists' });

  users.push({ username, password });
  res.json({ message: 'User registered' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
