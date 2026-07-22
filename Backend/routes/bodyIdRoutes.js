const express = require('express');
const router = express.Router();
const bodyIdController = require('../controllers/bodyIdController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, bodyIdController.getAllBodyIdentifications);
router.get('/:id', auth, bodyIdController.getBodyIdentificationById);
router.post('/', auth, bodyIdController.createBodyIdentification);
router.put('/:id', auth, bodyIdController.updateBodyIdentification);
router.delete('/:id', auth, bodyIdController.deleteBodyIdentification);

module.exports = router;
