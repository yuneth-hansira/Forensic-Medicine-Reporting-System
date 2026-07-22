const pool = require('../config/db');

// @desc    Get all audit logs
// @route   GET /api/audit-logs
// @access  Private
exports.getAllLogs = async (req, res) => {
    try {
        const [logs] = await pool.query(`
            SELECT a.*, u.Username
            FROM Audit_Log a
            LEFT JOIN User u ON a.User_ID = u.User_ID
            ORDER BY a.Timestamp DESC
        `);
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching audit logs' });
    }
};

// @desc    Get single audit log by ID
// @route   GET /api/audit-logs/:id
// @access  Private
exports.getLogById = async (req, res) => {
    try {
        const [logs] = await pool.query(`
            SELECT a.*, u.Username
            FROM Audit_Log a
            LEFT JOIN User u ON a.User_ID = u.User_ID
            WHERE a.Log_ID = ?
        `, [req.params.id]);
        if (logs.length === 0) {
            return res.status(404).json({ message: 'Audit Log not found' });
        }
        res.json(logs[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching audit log by id' });
    }
};

// @desc    Create Audit Log manually
// @route   POST /api/audit-logs
// @access  Private
exports.createLog = async (req, res) => {
    try {
        const { User_ID, Action, Table_Affected } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO Audit_Log (User_ID, Action, Table_Affected) VALUES (?, ?, ?)',
            [User_ID || null, Action, Table_Affected || null]
        );
        
        res.status(201).json({ 
            message: 'Audit Log created successfully', 
            Log_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error creating audit log' });
    }
};

// @desc    Update Audit Log (Usually shouldn't happen, but here for consistency)
// @route   PUT /api/audit-logs/:id
// @access  Private
exports.updateLog = async (req, res) => {
    try {
        const { User_ID, Action, Table_Affected } = req.body;
        const id = req.params.id;

        const [result] = await pool.query(
            'UPDATE Audit_Log SET User_ID = ?, Action = ?, Table_Affected = ? WHERE Log_ID = ?',
            [User_ID || null, Action || null, Table_Affected || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Audit Log not found' });
        }

        res.json({ message: 'Audit Log updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating audit log' });
    }
};

// @desc    Delete Audit Log
// @route   DELETE /api/audit-logs/:id
// @access  Private
exports.deleteLog = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Audit_Log WHERE Log_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Audit Log not found' });
        }

        res.json({ message: 'Audit Log deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting audit log' });
    }
};
