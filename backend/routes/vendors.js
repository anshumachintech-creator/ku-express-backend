const express = require('express');
const Vendor = require('../models/Vendor');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// GET ALL VENDORS (Admin only)
router.get('/', auth(['admin']), async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE VENDOR (Admin only)
router.post('/', auth(['admin']), async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ message: 'Vendor created', vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE VENDOR (Admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: 'Vendor updated', vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
