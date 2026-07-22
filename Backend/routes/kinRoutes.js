const express = require('express');
const router = express.Router();
const kinController = require('../controllers/kinController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, kinController.getAllNextOfKin);
router.get('/:id', auth, kinController.getNextOfKinById);
router.post('/', auth, kinController.createNextOfKin);
router.put('/:id', auth, kinController.updateNextOfKin);
router.delete('/:id', auth, kinController.deleteNextOfKin);

module.exports = router;
