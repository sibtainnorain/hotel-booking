var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

app.use(express.static('./app/public'));
app.use(bodyParser.json()); // parse application/json
app.use(morgan('dev'));

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);