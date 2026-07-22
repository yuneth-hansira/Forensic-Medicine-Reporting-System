const express = require('express');
const router = express.Router();
const consentController = require('../controllers/consentController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, consentController.getAllConsents);
router.get('/examinee/:examineeId', auth, consentController.getConsentsByExaminee);
router.get('/:id', auth, consentController.getConsentById);
router.post('/', auth, consentController.createConsent);
router.put('/:id', auth, consentController.updateConsent);
router.delete('/:id', auth, consentController.deleteConsent);

module.exports = router;
