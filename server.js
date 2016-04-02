// modules =================================================
var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');

// configuration ===========================================

// set our port
var port = process.env.PORT || 3000;

app.use(morgan('dev'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// routes ================================================================
require('./app/routes.js')(app);

router.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.use('/',router);
// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Now available at localhost:' + port);

// expose app
exports = module.exports = app;