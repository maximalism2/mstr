/**
 * Template for 'userData' model
 */
var Types = require('mongoose').Schema.Types;

const template = {
  userId: {
    type: Types.ObjectId,
    required: true
  },
  firstName: {
    type: String,
    // required: true
  },
  secondName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
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
    validate: {
      validator: function(v) {
        return /\+38\d{10}/.test(v);
      },
      message: '{VALUE} is not a valid phone number'
    }
  },
  avatar: {
    s400: {
      type: String,
      default: '/static/images/400_400/avatar.png'
    },
    s200: {
      type: String,
      default: '/static/images/200_200/avatar.png'
    },
    s50: {
      type: String,
      default: '/static/images/50_50/avatar.png'
    }
  }
};

module.exports = template