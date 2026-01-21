const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/shipments', require('./routes/shipments'));
app.use('/api/pincodes', require('./routes/pincodes'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/rates', require('./routes/rates'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'KU Express API running' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
