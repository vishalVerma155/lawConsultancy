// models/ContactUs.js

const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  }
}, {timestamps : true});

const ContectUs = mongoose.model('ContactUs', contactUsSchema);
module.exports = ContectUs;
