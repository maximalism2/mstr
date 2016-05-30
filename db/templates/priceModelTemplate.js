/**
 * Template for document "Prices" in database
 */
const Schema = require('mongoose').Schema;

const template = {
  name: {                            // Name of price (catalog)
    type: String,
    trim: true,
    required: true
  },
  discount: {                        // Discount for specific price
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  currency: {                        // Currency of the price
    type: String,
    enum: ['UAH', 'USD', 'EUR'],
    required: true
  },
  products: [Schema.Types.ObjectId], // Array of products IDs
  updatedAt: {                       // Date of last updating (modifying)
    type: Date,
    default: new Date()
  }
};

module.exports = template;
