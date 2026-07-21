const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', reportController.getReports);
router.get('/case/:caseId', reportController.getReportsByCaseId);
router.post('/', reportController.createReport);
router.get('/certificates', reportController.getCertificates);

module.exports = router;
