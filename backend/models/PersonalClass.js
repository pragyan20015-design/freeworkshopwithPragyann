const mongoose = require('mongoose');

const personalClassSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    level: { type: String, default: '' },
    duration: { type: String, default: '' },
    price: { type: String, default: 'Contact for pricing' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PersonalClass', personalClassSchema);
