/**
 * Template for document "Product" in database
 */
const Schema = require('mongoose').Schema;

const template = {
  name: String,                       // Name Of product
  cost: Number,                       // How much cost this product
  priceOrigin: Schema.Types.ObjectId, // From which catalog this product is
  unitOfMeasurment: String,           // Unit of measurment
};

module.exports = template;
