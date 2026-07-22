const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, doctorController.getAllDoctors);
router.get('/:id', auth, doctorController.getDoctorById);
router.post('/', auth, doctorController.createDoctor);
router.put('/:id', auth, doctorController.updateDoctor);
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
