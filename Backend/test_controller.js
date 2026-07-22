const { getDashboardData } = require('./controllers/dashboardController');

async function run() {
  const req = {};
  const res = {
    json: (data) => console.log('SUCCESS:', JSON.stringify(data, null, 2)),
    status: (code) => {
      console.log('STATUS:', code);
      return {
        json: (data) => console.log('ERROR JSON:', data)
      };
    }
  };
  await getDashboardData(req, res);
  process.exit(0);
}
run();
