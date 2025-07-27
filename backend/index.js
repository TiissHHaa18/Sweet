const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const sweetRoutes = require('./routes/sweets');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
