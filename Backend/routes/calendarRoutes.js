const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const auth = require('../middleware/authMiddleware');

// Get all calendar events
router.get('/events', auth, calendarController.getCalendarEvents);

module.exports = router;
