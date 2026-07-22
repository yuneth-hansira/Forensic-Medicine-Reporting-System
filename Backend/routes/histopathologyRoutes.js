const express = require('express');
const router = express.Router();
const histopathologyController = require('../controllers/histopathologyController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, histopathologyController.getAllReports);
router.get('/:id', auth, histopathologyController.getReportById);
router.post('/', auth, histopathologyController.createReport);
router.put('/:id', auth, histopathologyController.updateReport);
router.delete('/:id', auth, histopathologyController.deleteReport);

module.exports = router;
