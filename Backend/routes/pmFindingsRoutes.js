const express = require('express');
const router = express.Router();
const pmFindingsController = require('../controllers/pmFindingsController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, pmFindingsController.getAllFindings);
router.get('/:id', auth, pmFindingsController.getFindingById);
router.post('/', auth, pmFindingsController.createFinding);
router.put('/:id', auth, pmFindingsController.updateFinding);
router.delete('/:id', auth, pmFindingsController.deleteFinding);

module.exports = router;
