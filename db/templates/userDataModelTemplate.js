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
  biography: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length <= 2000;
      },
      message: 'biography must be shorter than 2000 characters!'
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\+38\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: '{VALUE} is not a valid phone number'
    }
  }
  avatar: {
    fullSize: {
      type: String
      default: '/static/images/defaultavatar.png'
    },
  }
};

module.exports = template