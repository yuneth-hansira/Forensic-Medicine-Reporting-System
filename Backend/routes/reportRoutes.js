const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, reportController.getReports);
router.get('/case/:caseId', auth, reportController.getReportsByCaseId);
router.get('/:id', auth, reportController.getReportById);
router.post('/', auth, reportController.createReport);
router.put('/:id', auth, reportController.updateReport);
router.delete('/:id', auth, reportController.deleteReport);
router.get('/certificates', auth, reportController.getCertificates); // Optional from original

module.exports = router;
