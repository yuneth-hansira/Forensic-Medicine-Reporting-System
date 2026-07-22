const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, certificateController.getAllCertificates);
router.get('/case/:caseId', auth, certificateController.getCertificatesByCase);
router.get('/:id', auth, certificateController.getCertificateById);
router.post('/', auth, certificateController.createCertificate);
router.put('/:id', auth, certificateController.updateCertificate);
router.delete('/:id', auth, certificateController.deleteCertificate);

module.exports = router;
