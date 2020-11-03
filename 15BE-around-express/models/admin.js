const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model('admin', adminSchema);