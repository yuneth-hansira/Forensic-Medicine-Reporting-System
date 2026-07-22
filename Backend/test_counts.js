const http = require('http');

const loginData = JSON.stringify({ username: 'admin', password: '123' }); // Try 123 or 1234. Wait, the login payload for admin was 'admin' and '1234' in my powershell? Let's just query the DB directly in the script.

const mysql = require('mysql2/promise');
async function run() {
  const pool = mysql.createPool({host:'localhost', user:'root', password:'Tharushainuwara12345', database:'forensic_medicine_db'});
  try {
    const [c] = await pool.query('SELECT COUNT(*) as c FROM `Case`');
    const [p] = await pool.query('SELECT COUNT(*) as c FROM Patient');
    console.log('Cases in DB:', c[0].c, 'Patients in DB:', p[0].c);
  } catch(e) {
    console.log('Error:', e);
  }
  process.exit(0);
}
run();
