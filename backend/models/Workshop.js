const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    day: { type: String, required: true, trim: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    link: { type: String, default: '' },
    isCustom: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workshop', workshopSchema);
