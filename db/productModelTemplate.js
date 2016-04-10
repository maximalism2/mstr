/**
 * Template for document "Product" in database
 */
const Schema = require('mongoose').Schema;

const template = {
  name: String,                    // Name Of product
  cost: Number,                    // How much cost this product
  priceOrigin: Number,             // From which catalog this product is
  unitOfMeasurment: String,        // Unit of measurment
  productId: Schema.Types.ObjectId // Id of specific product
};

module.exports = template;
