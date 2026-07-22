const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, hospitalController.getHospitals);
router.get('/:id', auth, hospitalController.getHospitalById);
router.post('/', auth, hospitalController.createHospital);
router.put('/:id', auth, hospitalController.updateHospital);
router.delete('/:id', auth, hospitalController.deleteHospital);
router.get('/:id/wards', auth, hospitalController.getWards);

module.exports = router;
