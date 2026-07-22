const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, documentController.getAllDocuments);
router.get('/case/:caseId', auth, documentController.getDocumentsByCase);
router.get('/:id', auth, documentController.getDocumentById);
router.post('/', auth, documentController.createDocument);
router.put('/:id', auth, documentController.updateDocument);
router.delete('/:id', auth, documentController.deleteDocument);

module.exports = router;
