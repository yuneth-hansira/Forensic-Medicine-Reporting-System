const mysql = require('mysql2/promise'); 
async function run() { 
  const pool = mysql.createPool({host:'localhost', user:'root', password:'Tharushainuwara12345', database:'forensic_medicine_db'}); 
  try { 
    const [rows] = await pool.query(`SELECT c.Case_ID, c.Case_Status, c.Date_Registered, COALESCE(p.Full_Name, e.Full_Name, dec.Full_Name, 'Unknown') AS PatientName, 'N/A' AS DoctorName FROM \`Case\` c LEFT JOIN Examinee e ON c.Case_ID = e.Case_ID LEFT JOIN Patient p ON e.Patient_ID = p.Patient_ID LEFT JOIN Deceased dec ON c.Case_ID = dec.Case_ID ORDER BY c.Case_ID DESC LIMIT 5`); 
    console.log("SUCCESS:", rows); 
  } catch(e) { 
    console.error('Error:', e); 
  } 
  process.exit(0); 
} 
run();
