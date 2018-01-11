var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

require('./app/routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);