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
        const [[{ totalUsers }]] = await pool.query("SELECT COUNT(*) as totalUsers FROM User WHERE Role != 'Doctor'");
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

// @desc    Daily Case Report — cases registered today
// @route   GET /api/dashboard/report/daily
// @access  Private
exports.getDailyCaseReport = async (req, res) => {
    try {
        const [cases] = await pool.query(`
            SELECT c.Case_ID, c.MLEF_No_or_PM_No, c.Case_Type, c.Case_Status, c.Date_Registered,
                   COALESCE(
                       (SELECT e.Full_Name FROM Examinee e WHERE e.Case_ID = c.Case_ID LIMIT 1),
                       (SELECT d2.Full_Name FROM Deceased d2 WHERE d2.Case_ID = c.Case_ID LIMIT 1),
                       'N/A'
                   ) AS Person_Name,
                   COALESCE(
                       (SELECT doc.Name FROM Report r JOIN Doctor doc ON r.Doctor_ID = doc.Doctor_ID WHERE r.Case_ID = c.Case_ID LIMIT 1),
                       'Unassigned'
                   ) AS Doctor_Name,
                   (SELECT pi.Police_Station FROM Police_Info pi WHERE pi.Case_ID = c.Case_ID LIMIT 1) AS Police_Station,
                   (SELECT pi.Investigating_Officer FROM Police_Info pi WHERE pi.Case_ID = c.Case_ID LIMIT 1) AS Investigating_Officer
            FROM \`Case\` c
            WHERE c.Date_Registered = CURDATE()
            ORDER BY c.Case_ID DESC
        `);

        const [[{ totalToday }]] = await pool.query(
            'SELECT COUNT(*) as totalToday FROM `Case` WHERE Date_Registered = CURDATE()'
        );

        res.json({
            reportTitle: 'Daily Case Report',
            reportDate: new Date().toISOString().split('T')[0],
            totalCases: totalToday,
            cases
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating daily report' });
    }
};

// @desc    Monthly Report — cases this month with summary
// @route   GET /api/dashboard/report/monthly
// @access  Private
exports.getMonthlyReport = async (req, res) => {
    try {
        const [cases] = await pool.query(`
            SELECT c.Case_ID, c.MLEF_No_or_PM_No, c.Case_Type, c.Case_Status, c.Date_Registered,
                   COALESCE(
                       (SELECT e.Full_Name FROM Examinee e WHERE e.Case_ID = c.Case_ID LIMIT 1),
                       (SELECT d2.Full_Name FROM Deceased d2 WHERE d2.Case_ID = c.Case_ID LIMIT 1),
                       'N/A'
                   ) AS Person_Name,
                   COALESCE(
                       (SELECT doc.Name FROM Report r JOIN Doctor doc ON r.Doctor_ID = doc.Doctor_ID WHERE r.Case_ID = c.Case_ID LIMIT 1),
                       'Unassigned'
                   ) AS Doctor_Name
            FROM \`Case\` c
            WHERE MONTH(c.Date_Registered) = MONTH(CURDATE())
              AND YEAR(c.Date_Registered) = YEAR(CURDATE())
            ORDER BY c.Date_Registered DESC
        `);

        const [statusSummary] = await pool.query(`
            SELECT COALESCE(Case_Status, 'Unknown') as status, COUNT(*) as count
            FROM \`Case\`
            WHERE MONTH(Date_Registered) = MONTH(CURDATE())
              AND YEAR(Date_Registered) = YEAR(CURDATE())
            GROUP BY Case_Status
        `);

        res.json({
            reportTitle: 'Monthly Report',
            reportMonth: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
            totalCases: cases.length,
            statusSummary,
            cases
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating monthly report' });
    }
};

// @desc    Pending Cases Report
// @route   GET /api/dashboard/report/pending
// @access  Private
exports.getPendingCasesReport = async (req, res) => {
    try {
        const [cases] = await pool.query(`
            SELECT c.Case_ID, c.MLEF_No_or_PM_No, c.Case_Type, c.Case_Status, c.Date_Registered,
                   COALESCE(
                       (SELECT e.Full_Name FROM Examinee e WHERE e.Case_ID = c.Case_ID LIMIT 1),
                       (SELECT d2.Full_Name FROM Deceased d2 WHERE d2.Case_ID = c.Case_ID LIMIT 1),
                       'N/A'
                   ) AS Person_Name,
                   COALESCE(
                       (SELECT doc.Name FROM Report r JOIN Doctor doc ON r.Doctor_ID = doc.Doctor_ID WHERE r.Case_ID = c.Case_ID LIMIT 1),
                       'Unassigned'
                   ) AS Doctor_Name,
                   (SELECT pi.Police_Station FROM Police_Info pi WHERE pi.Case_ID = c.Case_ID LIMIT 1) AS Police_Station,
                   (SELECT pi.Investigating_Officer FROM Police_Info pi WHERE pi.Case_ID = c.Case_ID LIMIT 1) AS Investigating_Officer,
                   DATEDIFF(CURDATE(), c.Date_Registered) AS Days_Pending
            FROM \`Case\` c
            WHERE LOWER(c.Case_Status) LIKE '%pending%'
            ORDER BY c.Date_Registered ASC
        `);

        res.json({
            reportTitle: 'Pending Cases Report',
            reportDate: new Date().toISOString().split('T')[0],
            totalPending: cases.length,
            cases
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating pending cases report' });
    }
};

// @desc    Court Report — cases with court info
// @route   GET /api/dashboard/report/court
// @access  Private
exports.getCourtReport = async (req, res) => {
    try {
        const [cases] = await pool.query(`
            SELECT c.Case_ID, c.MLEF_No_or_PM_No, c.Case_Type, c.Case_Status,
                   ci.Court_Name, ci.Magistrate_Name, ci.Case_Number AS Court_Case_Number,
                   ci.Date_Of_Trial,
                   COALESCE(
                       (SELECT e.Full_Name FROM Examinee e WHERE e.Case_ID = c.Case_ID LIMIT 1),
                       (SELECT d2.Full_Name FROM Deceased d2 WHERE d2.Case_ID = c.Case_ID LIMIT 1),
                       'N/A'
                   ) AS Person_Name,
                   COALESCE(
                       (SELECT doc.Name FROM Report r JOIN Doctor doc ON r.Doctor_ID = doc.Doctor_ID WHERE r.Case_ID = c.Case_ID LIMIT 1),
                       'Unassigned'
                   ) AS Doctor_Name
            FROM Court_info ci
            INNER JOIN \`Case\` c ON ci.Case_ID = c.Case_ID
            ORDER BY ci.Date_Of_Trial DESC
        `);

        res.json({
            reportTitle: 'Court Report',
            reportDate: new Date().toISOString().split('T')[0],
            totalCases: cases.length,
            cases
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating court report' });
    }
};

// @desc    Statistical Report — aggregate stats
// @route   GET /api/dashboard/report/statistical
// @access  Private
exports.getStatisticalReport = async (req, res) => {
    try {
        // Cases by type
        const [casesByType] = await pool.query(`
            SELECT COALESCE(Case_Type, 'Unknown') as category, COUNT(*) as count
            FROM \`Case\` GROUP BY Case_Type ORDER BY count DESC
        `);

        // Cases by status
        const [casesByStatus] = await pool.query(`
            SELECT COALESCE(Case_Status, 'Unknown') as category, COUNT(*) as count
            FROM \`Case\` GROUP BY Case_Status ORDER BY count DESC
        `);

        // Cases per month (current year)
        const [casesPerMonth] = await pool.query(`
            SELECT MONTH(Date_Registered) as month, COUNT(*) as count
            FROM \`Case\`
            WHERE YEAR(Date_Registered) = YEAR(CURDATE()) AND Date_Registered IS NOT NULL
            GROUP BY MONTH(Date_Registered)
            ORDER BY month
        `);

        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const monthlyData = Array(12).fill(0);
        casesPerMonth.forEach(row => { if (row.month >= 1 && row.month <= 12) monthlyData[row.month - 1] = row.count; });
        const formattedMonthly = monthlyData.map((count, i) => ({ month: months[i], count }));

        // Doctor workload
        const [doctorWorkload] = await pool.query(`
            SELECT doc.Name as doctor, COUNT(r.Report_ID) as reports_count
            FROM Doctor doc
            LEFT JOIN Report r ON doc.Doctor_ID = r.Doctor_ID
            GROUP BY doc.Doctor_ID, doc.Name
            ORDER BY reports_count DESC
        `);

        // Totals
        const [[{ totalCases }]] = await pool.query('SELECT COUNT(*) as totalCases FROM `Case`');
        const [[{ totalPatients }]] = await pool.query('SELECT COUNT(*) as totalPatients FROM Patient');
        const [[{ totalDoctors }]] = await pool.query('SELECT COUNT(*) as totalDoctors FROM Doctor');
        const [[{ totalReports }]] = await pool.query('SELECT COUNT(*) as totalReports FROM Report');

        res.json({
            reportTitle: 'Statistical Report',
            reportDate: new Date().toISOString().split('T')[0],
            totals: { totalCases, totalPatients, totalDoctors, totalReports },
            casesByType,
            casesByStatus,
            casesPerMonth: formattedMonthly,
            doctorWorkload
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error generating statistical report' });
    }
};
