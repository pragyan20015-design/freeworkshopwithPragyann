const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { authenticate, activeTokens } = require('../middleware/auth');
const PersonalInquiry = require('../models/PersonalInquiry');

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required.' });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.add(token);

  res.json({ token, message: 'Login successful.' });
});

// POST /api/admin/logout
router.post('/logout', authenticate, (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    activeTokens.delete(token);
  }
  res.json({ message: 'Logged out successfully.' });
});

// GET /api/admin/personal/inquiries
router.get('/personal/inquiries', authenticate, async (req, res) => {
  try {
    const inquiries = await PersonalInquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

module.exports = router;
