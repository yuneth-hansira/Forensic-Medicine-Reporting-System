const express = require('express');
const router = express.Router();
const clinicalFindingsController = require('../controllers/clinicalFindingsController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, clinicalFindingsController.getAllClinicalFindings);
router.get('/case/:caseId', auth, clinicalFindingsController.getClinicalFindingsByCase);
router.get('/:id', auth, clinicalFindingsController.getClinicalFindingById);
router.post('/', auth, clinicalFindingsController.createClinicalFinding);
router.put('/:id', auth, clinicalFindingsController.updateClinicalFinding);
router.delete('/:id', auth, clinicalFindingsController.deleteClinicalFinding);

module.exports = router;
