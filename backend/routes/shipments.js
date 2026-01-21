const express = require('express');
const Shipment = require('../models/Shipment');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// CREATE SHIPMENT
router.post('/', auth(['b2b', 'b2c']), async (req, res) => {
  try {
    const shipmentId = 'KU' + Date.now();
    
    const shipment = new Shipment({
      ...req.body,
      userId: req.user.id,
      shipmentId,
      trackingEvents: [
        {
          status: 'CREATED',
          timestamp: new Date(),
          remarks: 'Shipment created',
        },
      ],
    });

    await shipment.save();

    res.status(201).json({
      message: 'Shipment created',
      shipment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL SHIPMENTS (User's shipments)
router.get('/', auth(['b2b', 'b2c']), async (req, res) => {
  try {
    const shipments = await Shipment.find({ userId: req.user.id });
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SHIPMENT BY ID
router.get('/:id', auth(), async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE SHIPMENT STATUS
router.put('/:id/status', auth(['admin', 'ops']), async (req, res) => {
  try {
    const { status, remarks, location } = req.body;

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Add tracking event
    shipment.trackingEvents.push({
      status,
      timestamp: new Date(),
      location,
      remarks,
    });

    await shipment.save();

    res.json({ message: 'Shipment updated', shipment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
