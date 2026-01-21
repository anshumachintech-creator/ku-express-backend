const mongoose = require('mongoose');

const rateCardSchema = new mongoose.Schema(
  {
    name: String,
    basePrice: Number,
    kuExpressMarkup: Number,
    
    weightSlabs: [
      {
        minWeight: Number,
        maxWeight: Number,
        price: Number,
      },
    ],
    
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RateCard', rateCardSchema);
