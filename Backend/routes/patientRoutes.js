const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware'); // Ensure auth middleware exists

// @route   GET /api/patients
// @desc    Get all patients
// @access  Private
router.get('/', auth, patientController.getAllPatients);

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Private
router.get('/:id', auth, patientController.getPatientById);

// @route   POST /api/patients
// @desc    Register a new patient
// @access  Private
router.post('/', auth, patientController.createPatient);

// @route   PUT /api/patients/:id
// @desc    Update a patient
// @access  Private
router.put('/:id', auth, patientController.updatePatient);

// @route   DELETE /api/patients/:id
// @desc    Delete a patient
// @access  Private
router.delete('/:id', auth, patientController.deletePatient);

module.exports = router;
