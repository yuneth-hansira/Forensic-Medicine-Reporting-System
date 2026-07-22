const express = require('express');
const router = express.Router();
const wardController = require('../controllers/wardController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, wardController.getAllWards);
router.get('/:id', auth, wardController.getWardById);
router.post('/', auth, wardController.createWard);
router.put('/:id', auth, wardController.updateWard);
router.delete('/:id', auth, wardController.deleteWard);

module.exports = router;
