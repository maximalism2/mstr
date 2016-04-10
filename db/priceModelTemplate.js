/**
 * Template for document "Prices" in database
 */
const Schema = require('mongoose').Schema;

const template = {
  name: String,                      // Name of price (catalog)
  discount: Number,                  // Discount for specific price
  products: [Schema.Types.ObjectId], // Array of products IDs
  priceId: Schema.Types.ObjectId     // Id of specific price
};

module.exports = template;
