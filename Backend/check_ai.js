const pool = require('./config/db');

async function run() {
    try {
        const [rows] = await pool.query("SELECT * FROM Patient;");
        console.log(rows);
    } catch (e) {
        console.error(e);
    }
    process.exit();
}
run();
