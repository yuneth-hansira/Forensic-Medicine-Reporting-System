const express = require('express');
const router = express.Router();
const exhibitController = require('../controllers/exhibitController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, exhibitController.getAllExhibits);
router.get('/:id', auth, exhibitController.getExhibitById);
router.post('/', auth, exhibitController.createExhibit);
router.put('/:id', auth, exhibitController.updateExhibit);
router.delete('/:id', auth, exhibitController.deleteExhibit);

module.exports = router;
