const mongoose = require('mongoose');
const val = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User must have email'],
    validate: {
      validator: e => val.isEmail(e),
      message: 'Email validation failed',
    },
  },
  password: {
    type: String,
    required: [true, 'User must have password'],
  },
  address: {
    type: Array,
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  payments: {
    type: Array,
    default: [],
  },
  orderList: {
    type: Array,
    default: [],
  },
  cartList: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// IMP: Methods

const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;
