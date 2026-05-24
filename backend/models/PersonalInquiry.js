const mongoose = require('mongoose');

const personalInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '' },
    selectedClass: { type: String, required: true },
    message: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PersonalInquiry', personalInquirySchema);
