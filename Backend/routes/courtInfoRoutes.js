const express = require('express');
const router = express.Router();
const courtInfoController = require('../controllers/courtInfoController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, courtInfoController.getAllCourtInfo);
router.get('/case/:caseId', auth, courtInfoController.getCourtInfoByCase);
router.get('/:id', auth, courtInfoController.getCourtInfoById);
router.post('/', auth, courtInfoController.createCourtInfo);
router.put('/:id', auth, courtInfoController.updateCourtInfo);
router.delete('/:id', auth, courtInfoController.deleteCourtInfo);

module.exports = router;
