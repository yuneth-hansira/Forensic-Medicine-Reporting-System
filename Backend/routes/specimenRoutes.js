const express = require('express');
const router = express.Router();
const specimenController = require('../controllers/specimenController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, specimenController.getAllSpecimens);
router.get('/:id', auth, specimenController.getSpecimenById);
router.post('/', auth, specimenController.createSpecimen);
router.put('/:id', auth, specimenController.updateSpecimen);
router.delete('/:id', auth, specimenController.deleteSpecimen);

module.exports = router;
