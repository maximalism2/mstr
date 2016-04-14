/**
 * Template for document "Prices" in database
 */
const Schema = require('mongoose').Schema;

const template = {
  name: String,                      // Name of price (catalog)
  discount: Number,                  // Discount for specific price
  products: [Schema.Types.ObjectId], // Array of products IDs
  updatedAt: Date                    // Date of last updating (modifying)
};

module.exports = template;
