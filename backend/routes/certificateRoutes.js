const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { requestCertificate, getUserCertificates, verifyCertificate } = require('../controllers/certificateController');

router.post('/request', protect, upload.single('idCardImage'), requestCertificate);
router.get('/my-certificates', protect, getUserCertificates);
router.get('/verify/:certificateNumber', verifyCertificate);

module.exports = router;
