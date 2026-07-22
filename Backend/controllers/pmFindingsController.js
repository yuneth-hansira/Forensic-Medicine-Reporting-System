const pool = require('../config/db');

// @desc    Get all postmortem findings
// @route   GET /api/pm-findings
// @access  Private
exports.getAllFindings = async (req, res) => {
    try {
        const [findings] = await pool.query(`
            SELECT p.*, c.Case_Status as Case_Status 
            FROM Postmortem_Findings p
            LEFT JOIN \`Case\` c ON p.Case_ID = c.Case_ID
            ORDER BY p.PM_Finding_ID DESC
        `);
        res.json(findings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching postmortem findings' });
    }
};

// @desc    Get single postmortem finding by ID
// @route   GET /api/pm-findings/:id
// @access  Private
exports.getFindingById = async (req, res) => {
    try {
        const [findings] = await pool.query(`
            SELECT p.*, c.Case_Status as Case_Status 
            FROM Postmortem_Findings p
            LEFT JOIN \`Case\` c ON p.Case_ID = c.Case_ID
            WHERE p.PM_Finding_ID = ?
        `, [req.params.id]);
        
        if (findings.length === 0) {
            return res.status(404).json({ message: 'Postmortem finding not found' });
        }
        res.json(findings[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching postmortem finding by id' });
    }
};

// @desc    Create Postmortem Finding
// @route   POST /api/pm-findings
// @access  Private
exports.createFinding = async (req, res) => {
    try {
        const { 
            Case_ID, PMR_Text, Immediate_Cause_Of_Death, Antecedent_Cause, 
            Contributory_Cause, Interval_Onset_Death, Maternal_Death, Comments_Opinions 
        } = req.body;
        
        if (!Case_ID) {
            return res.status(400).json({ message: 'Case ID is required' });
        }

        const isMaternal = Maternal_Death === true || Maternal_Death === 'true' || Maternal_Death === 1;

        const [result] = await pool.query(
            'INSERT INTO Postmortem_Findings (Case_ID, PMR_Text, Immediate_Cause_Of_Death, Antecedent_Cause, Contributory_Cause, Interval_Onset_Death, Maternal_Death, Comments_Opinions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [Case_ID, PMR_Text || null, Immediate_Cause_Of_Death || null, Antecedent_Cause || null, Contributory_Cause || null, Interval_Onset_Death || null, isMaternal, Comments_Opinions || null]
        );
        
        res.status(201).json({ 
            message: 'Postmortem finding created successfully', 
            PM_Finding_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error creating postmortem finding' });
    }
};

// @desc    Update Postmortem Finding
// @route   PUT /api/pm-findings/:id
// @access  Private
exports.updateFinding = async (req, res) => {
    try {
        const { 
            Case_ID, PMR_Text, Immediate_Cause_Of_Death, Antecedent_Cause, 
            Contributory_Cause, Interval_Onset_Death, Maternal_Death, Comments_Opinions 
        } = req.body;
        const id = req.params.id;

        const isMaternal = Maternal_Death === true || Maternal_Death === 'true' || Maternal_Death === 1;

        const [result] = await pool.query(
            'UPDATE Postmortem_Findings SET Case_ID = ?, PMR_Text = ?, Immediate_Cause_Of_Death = ?, Antecedent_Cause = ?, Contributory_Cause = ?, Interval_Onset_Death = ?, Maternal_Death = ?, Comments_Opinions = ? WHERE PM_Finding_ID = ?',
            [Case_ID, PMR_Text || null, Immediate_Cause_Of_Death || null, Antecedent_Cause || null, Contributory_Cause || null, Interval_Onset_Death || null, isMaternal, Comments_Opinions || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Postmortem finding not found' });
        }

        res.json({ message: 'Postmortem finding updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).json({ message: 'Invalid Case ID. The referenced record does not exist.' });
        }
        res.status(500).json({ message: 'Server error updating postmortem finding' });
    }
};

// @desc    Delete Postmortem Finding
// @route   DELETE /api/pm-findings/:id
// @access  Private
exports.deleteFinding = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Postmortem_Findings WHERE PM_Finding_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Postmortem finding not found' });
        }

        res.json({ message: 'Postmortem finding deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting postmortem finding' });
    }
};
