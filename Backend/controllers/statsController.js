const pool = require('../config/db');

// @desc    Get dashboard statistics
// @route   GET /api/stats/dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const [totalCases] = await pool.query('SELECT COUNT(*) as count FROM `Case`');
        const [openCases] = await pool.query('SELECT COUNT(*) as count FROM `Case` WHERE Case_Status = "Open"');
        const [totalExaminees] = await pool.query('SELECT COUNT(*) as count FROM Examinee');
        const [totalDeceased] = await pool.query('SELECT COUNT(*) as count FROM Deceased');
        
        // Audit Logs (recent activity)
        const [recentActivity] = await pool.query('SELECT * FROM Audit_Log ORDER BY Timestamp DESC LIMIT 5');

        res.json({
            stats: {
                totalCases: totalCases[0].count,
                openCases: openCases[0].count,
                totalExaminees: totalExaminees[0].count,
                totalDeceased: totalDeceased[0].count
            },
            recentActivity
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
