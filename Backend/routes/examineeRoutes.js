const express = require('express');
const router = express.Router();
const examineeController = require('../controllers/examineeController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes
router.use(authMiddleware);

router.get('/', examineeController.getExaminees);
router.get('/:id', examineeController.getExamineeById);
router.post('/', examineeController.createExaminee);
router.put('/:id', examineeController.updateExaminee);
router.delete('/:id', examineeController.deleteExaminee);

module.exports = router;
