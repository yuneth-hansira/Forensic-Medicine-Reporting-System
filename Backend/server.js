const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Init DB Connection implicitly by requiring it
require('./config/db');

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cases', require('./routes/caseRoutes'));
app.use('/api/examinees', require('./routes/examineeRoutes'));
app.use('/api/deceased', require('./routes/deceasedRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/police-info', require('./routes/policeInfoRoutes'));
app.use('/api/court-info', require('./routes/courtInfoRoutes'));
app.use('/api/clinical-findings', require('./routes/clinicalFindingsRoutes'));
app.use('/api/injuries', require('./routes/injuryRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/consents', require('./routes/consentRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/wards', require('./routes/wardRoutes'));
app.use('/api/body-id', require('./routes/bodyIdRoutes'));
app.use('/api/next-of-kin', require('./routes/kinRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
