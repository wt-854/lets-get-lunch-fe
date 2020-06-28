const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');

app.use(cors());

// If an incoming request uses a protocol other than HTTPS, 
// redirect that request to the same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app to use forceSSL middleware
app.use(forceSSL());
// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/lets-get-lunch'));
// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/lets-get-lunch/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);