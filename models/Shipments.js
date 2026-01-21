const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shipmentId: {
      type: String,
      unique: true,
      required: true,
    },
    senderName: String,
    senderPhone: String,
    senderAddress: String,
    senderCity: String,
    senderState: String,
    senderPincode: String,
    
    receiverName: String,
    receiverPhone: String,
    receiverAddress: String,
    receiverCity: String,
    receiverState: String,
    receiverPincode: String,
    
    weight: Number,
    length: Number,
    width: Number,
    height: Number,
    
    productDescription: String,
    productValue: Number,
    
    status: {
      type: String,
      enum: ['CREATED', 'PICKED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
      default: 'CREATED',
    },
    
    pickupDate: Date,
    deliveryDate: Date,
    
    trackingEvents: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        location: String,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shipment', shipmentSchema);
