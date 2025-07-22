const db = require('../config/db');
const path = require('path');

// Upload a new document
exports.uploadDocument = (req, res) => {
  const { title, author, document_type, abstract } = req.body;
  const filename = req.file?.filename;

  if (!filename) return res.status(400).json({ error: 'File is required' });

  const sql = `
    INSERT INTO documents (title, author, document_type, abstract, filename)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, author, document_type, abstract, filename], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Document uploaded successfully' });
  });
};

// Get all documents
exports.getAllDocuments = (req, res) => {
  const sql = 'SELECT * FROM documents ORDER BY uploaded_at DESC';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Download document
exports.downloadDocument = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.download(filePath);
};
