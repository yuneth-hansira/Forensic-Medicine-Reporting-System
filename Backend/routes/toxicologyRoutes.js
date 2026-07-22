const express = require('express');
const router = express.Router();
const toxicologyController = require('../controllers/toxicologyController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, toxicologyController.getAllReports);
router.get('/:id', auth, toxicologyController.getReportById);
router.post('/', auth, toxicologyController.createReport);
router.put('/:id', auth, toxicologyController.updateReport);
router.delete('/:id', auth, toxicologyController.deleteReport);

module.exports = router;
