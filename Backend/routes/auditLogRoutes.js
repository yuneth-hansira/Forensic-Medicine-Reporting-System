const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, auditLogController.getAllLogs);
router.get('/:id', auth, auditLogController.getLogById);
router.post('/', auth, auditLogController.createLog);
router.put('/:id', auth, auditLogController.updateLog);
router.delete('/:id', auth, auditLogController.deleteLog);

module.exports = router;
