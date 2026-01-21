const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    
    serviceablePincodes: [String],
    
    apiKey: String,
    apiSecret: String,
    
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
