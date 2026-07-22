const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, referralController.getAllReferrals);
router.get('/:id', auth, referralController.getReferralById);
router.post('/', auth, referralController.createReferral);
router.put('/:id', auth, referralController.updateReferral);
router.delete('/:id', auth, referralController.deleteReferral);

module.exports = router;
