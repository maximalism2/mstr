/**
 * Template for 'userData' model
 */
const template = {
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
  avatar: {
    fullSize: {
      type: String
      default: '/static/images/defaultavatar.png'
    },
  }
};

module.exports = template