const express = require('express');
const router = express.Router();
const investigationController = require('../controllers/investigationController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, investigationController.getAllInvestigations);
router.get('/:id', auth, investigationController.getInvestigationById);
router.post('/', auth, investigationController.createInvestigation);
router.put('/:id', auth, investigationController.updateInvestigation);
router.delete('/:id', auth, investigationController.deleteInvestigation);

module.exports = router;
