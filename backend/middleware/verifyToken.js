const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
