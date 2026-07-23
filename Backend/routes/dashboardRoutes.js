const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, dashboardController.getDashboardData);
router.get('/report/daily', auth, dashboardController.getDailyCaseReport);
router.get('/report/monthly', auth, dashboardController.getMonthlyReport);
router.get('/report/pending', auth, dashboardController.getPendingCasesReport);
router.get('/report/court', auth, dashboardController.getCourtReport);
router.get('/report/statistical', auth, dashboardController.getStatisticalReport);
router.get('/calendar', auth, dashboardController.getCalendarEvents);

module.exports = router;
