/**
 * Template for document "User" in database
 */

const template = {
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

module.exports = template;
