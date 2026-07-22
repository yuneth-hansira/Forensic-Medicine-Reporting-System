const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all case routes
router.use(authMiddleware);

router.get('/', caseController.getCases);
router.get('/:id', caseController.getCaseById);
router.post('/', caseController.createCase);
router.put('/:id', caseController.updateCase);
router.delete('/:id', caseController.deleteCase);

module.exports = router;
