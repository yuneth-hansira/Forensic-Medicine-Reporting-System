const pool = require('../config/db');

// @desc    Get Clinical Finding by ID
// @route   GET /api/clinical-findings/:id
// @access  Private
exports.getClinicalFindingById = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Clinical_Findings WHERE Finding_ID = ?', [req.params.id]);
        if (records.length === 0) {
            return res.status(404).json({ message: 'Clinical finding not found' });
        }
        res.json(records[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching clinical finding by id' });
    }
};

// @desc    Get all Clinical Findings records
// @route   GET /api/clinical-findings
// @access  Private
exports.getAllClinicalFindings = async (req, res) => {
    try {
        const [records] = await pool.query(`
            SELECT cf.*, c.MLEF_No_or_PM_No as FMMS_Case_Number 
            FROM Clinical_Findings cf
            LEFT JOIN \`Case\` c ON cf.Case_ID = c.Case_ID
            ORDER BY cf.Finding_ID DESC
        `);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching clinical findings' });
    }
};

// @desc    Get Clinical Findings by Case ID
// @route   GET /api/clinical-findings/case/:caseId
// @access  Private
exports.getClinicalFindingsByCase = async (req, res) => {
    try {
        const [records] = await pool.query('SELECT * FROM Clinical_Findings WHERE Case_ID = ?', [req.params.caseId]);
        res.json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching clinical findings for case' });
    }
};

// @desc    Add new Clinical Finding
// @route   POST /api/clinical-findings
// @access  Private
exports.createClinicalFinding = async (req, res) => {
    try {
        const { Case_ID, Nature_Of_Bodily_Harm, Internal_Injuries, Category_Of_Hurt, Alcohol_Drug_Test, Sexual_Assault_Findings, Remarks } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case_ID is required' });
        }

        const [result] = await pool.query(
            'INSERT INTO Clinical_Findings (Case_ID, Nature_Of_Bodily_Harm, Internal_Injuries, Category_Of_Hurt, Alcohol_Drug_Test, Sexual_Assault_Findings, Remarks) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [Case_ID, Nature_Of_Bodily_Harm || null, Internal_Injuries || null, Category_Of_Hurt || null, Alcohol_Drug_Test || null, Sexual_Assault_Findings || null, Remarks || null]
        );
        
        res.status(201).json({ 
            message: 'Clinical finding added successfully', 
            Finding_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case_ID provided' });
        }
        res.status(500).json({ message: 'Server error adding clinical finding' });
    }
};

// @desc    Update Clinical Finding
// @route   PUT /api/clinical-findings/:id
// @access  Private
exports.updateClinicalFinding = async (req, res) => {
    try {
        const { Nature_Of_Bodily_Harm, Internal_Injuries, Category_Of_Hurt, Alcohol_Drug_Test, Sexual_Assault_Findings, Remarks } = req.body;
        const findingId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Clinical_Findings SET Nature_Of_Bodily_Harm = ?, Internal_Injuries = ?, Category_Of_Hurt = ?, Alcohol_Drug_Test = ?, Sexual_Assault_Findings = ?, Remarks = ? WHERE Finding_ID = ?',
            [Nature_Of_Bodily_Harm || null, Internal_Injuries || null, Category_Of_Hurt || null, Alcohol_Drug_Test || null, Sexual_Assault_Findings || null, Remarks || null, findingId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Clinical finding not found' });
        }

        res.json({ message: 'Clinical finding updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating clinical finding' });
    }
};

// @desc    Delete Clinical Finding
// @route   DELETE /api/clinical-findings/:id
// @access  Private
exports.deleteClinicalFinding = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Clinical_Findings WHERE Finding_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Clinical finding not found' });
        }

        res.json({ message: 'Clinical finding deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting clinical finding' });
    }
};
