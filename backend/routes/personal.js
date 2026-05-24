const express = require('express');
const router = express.Router();
const PersonalClass = require('../models/PersonalClass');
const PersonalInquiry = require('../models/PersonalInquiry');

// GET /api/personal/classes — public
router.get('/classes', async (req, res) => {
  try {
    const classes = await PersonalClass.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch personal classes.' });
  }
});

// POST /api/personal/inquiries — public
router.post('/inquiries', async (req, res) => {
  const { name, email, phone, selectedClass, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!selectedClass) {
    return res.status(400).json({ error: 'Please select a class.' });
  }

  try {
    const inquiry = new PersonalInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      selectedClass,
      message: message ? message.trim() : ''
    });
    await inquiry.save();
    res
      .status(201)
      .json({ message: 'Inquiry submitted successfully.', inquiry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit inquiry.' });
  }
});

module.exports = router;
