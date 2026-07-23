const pool = require('./config/db');
async function run() {
    try {
        await pool.query("SET GLOBAL auto_increment_increment = 1;");
        console.log("Success");
    } catch (e) {
        console.error(e);
    }
    process.exit();
}
run();
