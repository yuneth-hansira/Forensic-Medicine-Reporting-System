const express = require('express');
const router = express.Router();
const injuryController = require('../controllers/injuryController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, injuryController.getAllInjuries);
router.get('/case/:caseId', auth, injuryController.getInjuriesByCase);
router.get('/:id', auth, injuryController.getInjuryById);
router.post('/', auth, injuryController.createInjury);
router.put('/:id', auth, injuryController.updateInjury);
router.delete('/:id', auth, injuryController.deleteInjury);

module.exports = router;
