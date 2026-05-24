const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const { authenticate } = require('../middleware/auth');

// GET /api/workshops — public
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1, startTime: 1 });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workshops.' });
  }
});

// POST /api/workshops — admin only
router.post('/', authenticate, async (req, res) => {
  const { title, date, day, startTime, endTime, link } = req.body;

  if (!title || !date || !day || !startTime || !endTime) {
    return res.status(400).json({
      error: 'Title, date, day, start time, and end time are required.'
    });
  }

  if (link && link.trim() !== '') {
    try {
      new URL(link);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format for link.' });
    }
  }

  try {
    const workshop = new Workshop({
      title: title.trim(),
      date,
      day: day.trim(),
      startTime,
      endTime,
      link: link ? link.trim() : '',
      isCustom: true,
      isDefault: false
    });
    await workshop.save();
    res.status(201).json(workshop);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workshop.' });
  }
});

// DELETE /api/workshops/:id — admin only, custom workshops only
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found.' });
    }
    if (!workshop.isCustom) {
      return res
        .status(403)
        .json({ error: 'Default workshops cannot be deleted.' });
    }
    await Workshop.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workshop deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workshop.' });
  }
});

module.exports = router;
