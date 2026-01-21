const express = require('express');
const RateCard = require('../models/RateCard');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// GET ALL RATES
router.get('/', async (req, res) => {
  try {
    const rates = await RateCard.find();
    res.json(rates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE RATE (Admin only)
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const rate = new RateCard(req.body);
    await rate.save();
    res.status(201).json({ message: 'Rate created', rate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE RATE (Admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const rate = await RateCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: 'Rate updated', rate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
