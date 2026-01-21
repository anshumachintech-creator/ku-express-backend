const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema(
  {
    pincode: {
      type: String,
      required: true,
      unique: true,
    },
    city: String,
    state: String,
    zone: String,
    isServiceable: {
      type: Boolean,
      default: true,
    },
    deliveryDays: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pincode', pincodeSchema);
