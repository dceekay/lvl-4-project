const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadDocument,
  getAllDocuments,
  downloadDocument
} = require('../controllers/documentController');

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('file'), uploadDocument);
router.get('/documents', getAllDocuments);
router.get('/download/:filename', downloadDocument);

module.exports = router;
