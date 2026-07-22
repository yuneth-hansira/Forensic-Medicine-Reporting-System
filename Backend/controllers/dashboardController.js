const pool = require('../config/db');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
exports.getDashboardData = async (req, res) => {
    try {
        // 1. Total Patients
        const [[{ totalPatients }]] = await pool.query('SELECT COUNT(*) as totalPatients FROM Patient');
        
        // 2. Cases by status
        const [caseStatusCounts] = await pool.query('SELECT Case_Status, COUNT(*) as count FROM `Case` GROUP BY Case_Status');
        
        let activeCases = 0, pendingCases = 0, completedCases = 0, courtSubmitted = 0;
        caseStatusCounts.forEach(row => {
            const status = row.Case_Status ? row.Case_Status.toLowerCase() : 'pending';
            if (status.includes('active') || status.includes('progress') || status.includes('open')) activeCases += row.count;
            else if (status.includes('pending')) pendingCases += row.count;
            else if (status.includes('complete') || status.includes('closed')) completedCases += row.count;
            else if (status.includes('court')) courtSubmitted += row.count;
            else pendingCases += row.count; // Default unknown to pending
        });

        // 3. System Users
        const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) as totalUsers FROM User');
        const usersCount = totalUsers;
        
        // 5. Monthly Cases Data (Current Year)
        const [monthlyCasesDB] = await pool.query(`
            SELECT MONTH(Date_Registered) as month, COUNT(*) as count 
            FROM \`Case\` 
            WHERE YEAR(Date_Registered) = YEAR(CURDATE()) 
              AND Date_Registered IS NOT NULL
            GROUP BY MONTH(Date_Registered)
        `);
        
        const monthlyCases = Array(12).fill(0);
        monthlyCasesDB.forEach(row => {
            if (row.month >= 1 && row.month <= 12) {
                monthlyCases[row.month - 1] = row.count;
            }
        });

        // 6. Recent Cases
        const [recentCases] = await pool.query(`
            SELECT c.Case_ID, c.Case_Status, c.Date_Registered, 
                   COALESCE(p.Full_Name, e.Full_Name, d.Full_Name, 'Unknown') AS PatientName,
                   'N/A' AS DoctorName
            FROM \`Case\` c
            LEFT JOIN Examinee e ON c.Case_ID = e.Case_ID
            LEFT JOIN Patient p ON e.Patient_ID = p.Patient_ID
            LEFT JOIN Deceased d ON c.Case_ID = d.Case_ID
            ORDER BY c.Case_ID DESC LIMIT 5
        `);

        // 7. Recent Police Requests
        const [recentPoliceRequests] = await pool.query(`
            SELECT Police_ID, Police_Station, Investigating_Officer, Case_ID
            FROM Police_Info
            ORDER BY Police_ID DESC LIMIT 5
        `);

        // 8. Recent Examinations
        const [recentExaminations] = await pool.query(`
            SELECT Finding_ID, Case_ID, Nature_Of_Bodily_Harm, Category_Of_Hurt
            FROM Clinical_Findings
            ORDER BY Finding_ID DESC LIMIT 5
        `);

        // 9. Recent Exhibits
        const [recentExhibits] = await pool.query(`
            SELECT Exhibit_ID, Case_ID, Exhibit_Type as Type, 'Stored' as Status, Storage_Location as Location
            FROM Exhibit
            ORDER BY Exhibit_ID DESC LIMIT 5
        `);

        res.json({
            stats: {
                totalPatients,
                activeCases,
                pendingCases,
                completedCases,
                usersCount
            },
            pieData: [
                { name: 'Pending', value: pendingCases, color: '#3b82f6' },
                { name: 'In Progress', value: activeCases, color: '#f59e0b' },
                { name: 'Completed', value: completedCases, color: '#8b5cf6' },
                { name: 'Court Submitted', value: courtSubmitted, color: '#10b981' }
            ],
            monthlyCases,
            recentCases,
            recentPoliceRequests,
            recentExaminations,
            recentExhibits
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching dashboard data' });
    }
};
