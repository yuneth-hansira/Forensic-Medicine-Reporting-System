const pool = require('../config/db');

// @desc    Get all examinees
// @route   GET /api/examinees
exports.getExaminees = async (req, res) => {
    try {
        const [examinees] = await pool.query('SELECT * FROM Examinee');
        res.json(examinees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get single examinee by id
// @route   GET /api/examinees/:id
exports.getExamineeById = async (req, res) => {
    try {
        const [examinees] = await pool.query('SELECT * FROM Examinee WHERE Examinee_ID = ?', [req.params.id]);
        if (examinees.length === 0) {
            return res.status(404).json({ message: 'Examinee not found' });
        }
        
        const examineeData = examinees[0];
        
        // Fetch Consents
        const [consents] = await pool.query('SELECT * FROM Consent WHERE Examinee_ID = ?', [req.params.id]);
        examineeData.consents = consents;
        
        // Fetch Case info
        if (examineeData.Case_ID) {
            const [cases] = await pool.query('SELECT * FROM `Case` WHERE Case_ID = ?', [examineeData.Case_ID]);
            examineeData.caseDetails = cases.length > 0 ? cases[0] : null;

            const [clinicalFindings] = await pool.query('SELECT * FROM Clinical_Findings WHERE Case_ID = ?', [examineeData.Case_ID]);
            examineeData.clinicalFindings = clinicalFindings.length > 0 ? clinicalFindings[0] : null;

            const [injuries] = await pool.query('SELECT * FROM Injury WHERE Case_ID = ?', [examineeData.Case_ID]);
            examineeData.injuries = injuries;
        }

        res.json(examineeData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create an examinee
// @route   POST /api/examinees
exports.createExaminee = async (req, res) => {
    const { Case_ID, Full_Name, Sex, Age, NIC_Passport, Address } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO Examinee (Case_ID, Full_Name, Sex, Age, NIC_Passport, Address) VALUES (?, ?, ?, ?, ?, ?)',
            [Case_ID, Full_Name, Sex, Age, NIC_Passport, Address]
        );
        
        // Audit log
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Create Examinee', 'Examinee']
            );
        }
        
        res.status(201).json({ message: 'Examinee created successfully', examineeId: result.insertId });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Update an examinee
// @route   PUT /api/examinees/:id
exports.updateExaminee = async (req, res) => {
    const { Case_ID, Full_Name, Sex, Age, NIC_Passport, Address } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE Examinee SET Case_ID = ?, Full_Name = ?, Sex = ?, Age = ?, NIC_Passport = ?, Address = ? WHERE Examinee_ID = ?',
            [Case_ID, Full_Name, Sex, Age, NIC_Passport, Address, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Examinee not found' });
        }
        
        // Audit log
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Update Examinee', 'Examinee']
            );
        }
        
        res.json({ message: 'Examinee updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Delete an examinee
// @route   DELETE /api/examinees/:id
exports.deleteExaminee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Examinee WHERE Examinee_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Examinee not found' });
        }
        
        // Audit log
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Delete Examinee', 'Examinee']
            );
        }
        
        res.json({ message: 'Examinee deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
