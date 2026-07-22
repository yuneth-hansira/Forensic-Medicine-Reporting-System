const dashboardController = require('./controllers/dashboardController');

async function test() {
    const req = {};
    const res = {
        json: (data) => {
            console.log("SUCCESS:");
            console.log(JSON.stringify(data, null, 2));
            process.exit(0);
        },
        status: (code) => {
            return {
                json: (err) => {
                    console.error("ERROR " + code + ":", err);
                    process.exit(1);
                }
            }
        }
    };
    await dashboardController.getDashboardData(req, res);
}
test();
