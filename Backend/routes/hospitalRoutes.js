const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', hospitalController.getHospitals);
router.get('/:id/wards', hospitalController.getWards);

module.exports = router;
