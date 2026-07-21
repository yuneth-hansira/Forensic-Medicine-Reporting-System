const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);

module.exports = router;
