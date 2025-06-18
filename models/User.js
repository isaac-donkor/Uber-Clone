const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ['rider', 'driver'], required: true },
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('User', userSchema);
