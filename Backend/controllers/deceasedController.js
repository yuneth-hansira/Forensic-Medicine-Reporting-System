const pool = require('../config/db');

// @desc    Get all deceased records
// @route   GET /api/deceased
exports.getAllDeceased = async (req, res) => {
    try {
        const [deceased] = await pool.query('SELECT * FROM Deceased');
        res.json(deceased);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Get single deceased by id
// @route   GET /api/deceased/:id
exports.getDeceasedById = async (req, res) => {
    try {
        const [deceased] = await pool.query('SELECT * FROM Deceased WHERE Deceased_ID = ?', [req.params.id]);
        if (deceased.length === 0) {
            return res.status(404).json({ message: 'Deceased not found' });
        }
        
        const deceasedData = deceased[0];
        
        // Fetch Next of Kin
        const [kin] = await pool.query('SELECT * FROM Next_of_Kin WHERE Deceased_ID = ?', [req.params.id]);
        deceasedData.nextOfKin = kin;
        
        // Fetch Body Identification
        const [identifications] = await pool.query('SELECT * FROM Body_Identification WHERE Deceased_ID = ?', [req.params.id]);
        deceasedData.identifications = identifications;

        // Fetch Case info
        if (deceasedData.Case_ID) {
            const [cases] = await pool.query('SELECT * FROM `Case` WHERE Case_ID = ?', [deceasedData.Case_ID]);
            deceasedData.caseDetails = cases.length > 0 ? cases[0] : null;

            // Fetch Postmortem Findings
            const [pmFindings] = await pool.query('SELECT * FROM Postmortem_Findings WHERE Case_ID = ?', [deceasedData.Case_ID]);
            deceasedData.postmortemFindings = pmFindings.length > 0 ? pmFindings[0] : null;
        }

        res.json(deceasedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Create a deceased record
// @route   POST /api/deceased
exports.createDeceased = async (req, res) => {
    let { Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death, Place_Of_Death, Death_Type } = req.body;
    
    // Sanitize falsy values (like empty strings or undefined) to null for optional integer fields
    Hospital_ID = Hospital_ID || null;
    Ward_ID = Ward_ID || null;
    Age = Age || null;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO Deceased (Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death, Place_Of_Death, Death_Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death || null, Place_Of_Death, Death_Type]
        );
        
        
        
        res.status(201).json({ message: 'Deceased created successfully', deceasedId: result.insertId });
    } catch (err) {
        console.error(err.message);
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW_1') {
            return res.status(400).json({ message: 'Invalid Case ID. The specified Case does not exist.' });
        }
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};

// @desc    Update a deceased record
// @route   PUT /api/deceased/:id
exports.updateDeceased = async (req, res) => {
    let { Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death, Place_Of_Death, Death_Type } = req.body;
    
    // Sanitize falsy values (like empty strings or undefined) to null for optional integer fields
    Hospital_ID = Hospital_ID || null;
    Ward_ID = Ward_ID || null;
    Age = Age || null;

    try {
        const [result] = await pool.query(
            'UPDATE Deceased SET Case_ID = ?, Hospital_ID = ?, Ward_ID = ?, Full_Name = ?, Sex = ?, Age = ?, BHT_No = ?, Date_Of_Death = ?, Place_Of_Death = ?, Death_Type = ? WHERE Deceased_ID = ?',
            [Case_ID, Hospital_ID, Ward_ID, Full_Name, Sex, Age, BHT_No, Date_Of_Death || null, Place_Of_Death, Death_Type, req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Deceased not found' });
        }
        
        
        
        res.json({ message: 'Deceased updated successfully' });
    } catch (err) {
        console.error(err.message);
        if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_NO_REFERENCED_ROW_1') {
            return res.status(400).json({ message: 'Invalid Case ID. The specified Case does not exist.' });
        }
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};

// @desc    Delete a deceased record
// @route   DELETE /api/deceased/:id
exports.deleteDeceased = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Deceased WHERE Deceased_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Deceased not found' });
        }
        
        
        
        res.json({ message: 'Deceased deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
