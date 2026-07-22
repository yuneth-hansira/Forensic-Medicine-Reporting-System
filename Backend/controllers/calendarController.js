const pool = require('../config/db');

exports.getCalendarEvents = async (req, res) => {
    try {
        // Fetch Case Registrations
        const [cases] = await pool.query(`
            SELECT Case_ID, Case_Type, Date_Registered 
            FROM \`Case\` 
            WHERE Date_Registered IS NOT NULL
        `);
        
        // Fetch Court Trials
        const [courts] = await pool.query(`
            SELECT Case_ID, Court_Name, Date_Of_Trial 
            FROM Court_info 
            WHERE Date_Of_Trial IS NOT NULL
        `);

        const events = [];

        cases.forEach(c => {
            events.push({
                id: `case-${c.Case_ID}`,
                date: c.Date_Registered,
                type: 'case',
                title: `Case Registered: ${c.Case_Type || 'Unknown Type'} (ID: ${c.Case_ID})`
            });
        });

        courts.forEach(c => {
            events.push({
                id: `court-${c.Case_ID}`,
                date: c.Date_Of_Trial,
                type: 'court',
                title: `Court Trial: ${c.Court_Name || 'Unknown Court'} (Case ID: ${c.Case_ID})`
            });
        });

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching calendar events' });
    }
};
