const pool = require('../config/db');

// @desc    Get all cases
// @route   GET /api/cases
exports.getCases = async (req, res) => {
    try {
        const [cases] = await pool.query('SELECT * FROM `Case` ORDER BY Date_Registered DESC');
        res.json(cases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get single case
// @route   GET /api/cases/:id
exports.getCaseById = async (req, res) => {
    try {
        const [cases] = await pool.query('SELECT * FROM `Case` WHERE Case_ID = ?', [req.params.id]);
        if (cases.length === 0) {
            return res.status(404).json({ message: 'Case not found' });
        }
        
        const caseData = cases[0];
        
        // Fetch related info (Police, Court)
        const [policeInfo] = await pool.query('SELECT * FROM Police_Info WHERE Case_ID = ?', [req.params.id]);
        caseData.policeInfo = policeInfo.length > 0 ? policeInfo[0] : null;

        const [courtInfo] = await pool.query('SELECT * FROM Court_info WHERE Case_ID = ?', [req.params.id]);
        caseData.courtInfo = courtInfo.length > 0 ? courtInfo[0] : null;
        
        res.json(caseData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create a case
// @route   POST /api/cases
exports.createCase = async (req, res) => {
    const { Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered, policeInfo, courtInfo } = req.body;
    
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        
        // Insert Case
        const [caseResult] = await connection.query(
            'INSERT INTO `Case` (Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered) VALUES (?, ?, ?, ?)',
            [Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered]
        );
        const caseId = caseResult.insertId;
        
        // Insert Police Info if provided
        if (policeInfo) {
            await connection.query(
                'INSERT INTO Police_Info (Case_ID, Police_Station, Investigating_Officer, Officer_Reg_No, Officer_Rank) VALUES (?, ?, ?, ?, ?)',
                [caseId, policeInfo.Police_Station, policeInfo.Investigating_Officer, policeInfo.Officer_Reg_No, policeInfo.Officer_Rank]
            );
        }
        
        // Insert Court Info if provided
        if (courtInfo) {
            await connection.query(
                'INSERT INTO Court_info (Case_ID, Court_Name, Magistrate_Name, Case_Number, Date_Of_Trial) VALUES (?, ?, ?, ?, ?)',
                [caseId, courtInfo.Court_Name, courtInfo.Magistrate_Name, courtInfo.Case_Number, courtInfo.Date_Of_Trial]
            );
        }
        
        // Audit log
        if (req.user) {
            await connection.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Create Case', 'Case']
            );
        }
        
        await connection.commit();
        res.status(201).json({ message: 'Case created successfully', caseId });
        
    } catch (err) {
        if (connection) await connection.rollback();
        console.error(err.message);
        res.status(500).send('Server error');
    } finally {
        if (connection) connection.release();
    }
};

// @desc    Update a case
// @route   PUT /api/cases/:id
exports.updateCase = async (req, res) => {
    const { Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE `Case` SET Case_Type = ?, MLEF_No_or_PM_No = ?, Case_Status = ?, Date_Registered = ? WHERE Case_ID = ?',
            [Case_Type, MLEF_No_or_PM_No, Case_Status, Date_Registered, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Case not found' });
        }
        
        // Audit log
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Update Case', 'Case']
            );
        }
        
        res.json({ message: 'Case updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Delete a case
// @route   DELETE /api/cases/:id
exports.deleteCase = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM `Case` WHERE Case_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Case not found' });
        }
        
        // Audit log
        if (req.user) {
            await pool.query(
                'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
                [req.user.id, 'Delete Case', 'Case']
            );
        }
        
        res.json({ message: 'Case deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
