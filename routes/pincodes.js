const express = require('express');
const Pincode = require('../models/Pincode');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// GET ALL PINCODES
router.get('/', async (req, res) => {
  try {
    const pincodes = await Pincode.find();
    res.json(pincodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE PINCODE (Admin only)
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const pincode = new Pincode(req.body);
    await pincode.save();
    res.status(201).json({ message: 'Pincode created', pincode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PINCODE (Admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const pincode = await Pincode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: 'Pincode updated', pincode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
