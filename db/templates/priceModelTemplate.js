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
  products: [Schema.Types.ObjectId], // Array of products IDs
  updatedAt: Date                    // Date of last updating (modifying)
};

module.exports = template;
