const express = require('express');
const router = express.Router();
const deceasedController = require('../controllers/deceasedController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes
router.use(authMiddleware);

router.get('/', deceasedController.getAllDeceased);
router.get('/:id', deceasedController.getDeceasedById);
router.post('/', deceasedController.createDeceased);
router.put('/:id', deceasedController.updateDeceased);

module.exports = router;
