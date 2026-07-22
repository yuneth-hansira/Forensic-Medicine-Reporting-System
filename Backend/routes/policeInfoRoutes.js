const express = require('express');
const router = express.Router();
const policeInfoController = require('../controllers/policeInfoController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, policeInfoController.getAllPoliceInfo);
router.get('/case/:caseId', auth, policeInfoController.getPoliceInfoByCase);
router.post('/', auth, policeInfoController.createPoliceInfo);
router.put('/:id', auth, policeInfoController.updatePoliceInfo);
router.delete('/:id', auth, policeInfoController.deletePoliceInfo);

module.exports = router;
