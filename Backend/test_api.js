const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Login Response:', json);
      if (json.token) {
        http.get({
          hostname: 'localhost',
          port: 5000,
          path: '/api/dashboard',
          headers: {
            'Authorization': 'Bearer ' + json.token
          }
        }, (res2) => {
          let data2 = '';
          res2.on('data', chunk => data2 += chunk);
          res2.on('end', () => {
            console.log('Dashboard response length:', data2.length);
            console.log('Dashboard JSON:', data2.substring(0, 500));
          });
        });
      }
    } catch(e) {
      console.log('Error parsing login:', e);
    }
  });
});

req.on('error', (e) => console.log('HTTP Error:', e));

req.write(JSON.stringify({ username: 'johndoe', password: 'password123' })); // Need to guess user.
req.end();
