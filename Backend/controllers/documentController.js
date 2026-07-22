const pool = require('../config/db');

// @desc    Get all Documents
// @route   GET /api/documents
// @access  Private
exports.getAllDocuments = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT d.*, c.MLEF_No_or_PM_No as FMMS_Case_Number 
            FROM Document d
            LEFT JOIN \`Case\` c ON d.Case_ID = c.Case_ID
            ORDER BY d.Document_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching documents' });
    }
};

// @desc    Get Document by ID
// @route   GET /api/documents/:id
// @access  Private
exports.getDocumentById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Document WHERE Document_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching document by id' });
    }
};

// @desc    Get Documents by Case ID
// @route   GET /api/documents/case/:caseId
// @access  Private
exports.getDocumentsByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Document WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching documents for case' });
    }
};

// @desc    Add new Document
// @route   POST /api/documents
// @access  Private
exports.createDocument = async (req, res) => {
    try {
        const { Case_ID, Doc_Type, File_Path, Upload_Date } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Document (Case_ID, Doc_Type, File_Path, Upload_Date) VALUES (?, ?, ?, ?)',
            [Case_ID, Doc_Type || null, File_Path || null, Upload_Date || null]
        );
        
        res.status(201).json({ 
            message: 'Document added successfully', 
            Document_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding document' });
    }
};

// @desc    Update Document
// @route   PUT /api/documents/:id
// @access  Private
exports.updateDocument = async (req, res) => {
    try {
        const { Doc_Type, File_Path, Upload_Date } = req.body;
        const documentId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Document SET Doc_Type = ?, File_Path = ?, Upload_Date = ? WHERE Document_ID = ?',
            [Doc_Type || null, File_Path || null, Upload_Date || null, documentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({ message: 'Document updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating document' });
    }
};

// @desc    Delete Document
// @route   DELETE /api/documents/:id
// @access  Private
exports.deleteDocument = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Document WHERE Document_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting document' });
    }
};
