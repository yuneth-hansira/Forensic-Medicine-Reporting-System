const pool = require('../config/db');

exports.getAllPatients = async (req, res) => {
    try {
        const [patients] = await pool.query('SELECT * FROM Patient ORDER BY Patient_ID DESC');
        res.json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching patients' });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const [patients] = await pool.query('SELECT * FROM Patient WHERE Patient_ID = ?', [req.params.id]);
        if (patients.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patients[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching patient' });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { Full_Name, Sex, Date_Of_Birth, NIC_Passport, Blood_Group, Contact_No, Address, Hospital_ID, Ward_ID } = req.body;
        
        const [result] = await pool.query(
            'INSERT INTO Patient (Full_Name, Sex, Date_Of_Birth, NIC_Passport, Blood_Group, Contact_No, Address, Hospital_ID, Ward_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Full_Name, Sex || null, Date_Of_Birth || null, NIC_Passport || null, Blood_Group || null, Contact_No || null, Address || null, Hospital_ID || null, Ward_ID || null]
        );
        
        res.status(201).json({ 
            message: 'Patient registered successfully', 
            Patient_ID: result.insertId 
        });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Patient with this NIC/Passport already exists' });
        }
        res.status(500).json({ message: 'Server error registering patient' });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { Full_Name, Sex, Date_Of_Birth, NIC_Passport, Blood_Group, Contact_No, Address, Hospital_ID, Ward_ID } = req.body;
        const patientId = req.params.id;

        const [result] = await pool.query(
            'UPDATE Patient SET Full_Name = ?, Sex = ?, Date_Of_Birth = ?, NIC_Passport = ?, Blood_Group = ?, Contact_No = ?, Address = ?, Hospital_ID = ?, Ward_ID = ? WHERE Patient_ID = ?',
            [Full_Name, Sex || null, Date_Of_Birth || null, NIC_Passport || null, Blood_Group || null, Contact_No || null, Address || null, Hospital_ID || null, Ward_ID || null, patientId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ message: 'Patient updated successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Another patient with this NIC/Passport already exists' });
        }
        res.status(500).json({ message: 'Server error updating patient' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Patient WHERE Patient_ID = ?', [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting patient' });
    }
};
