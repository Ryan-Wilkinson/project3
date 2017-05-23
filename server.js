const session = require('express-session');
const express =require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Mongo Connection
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
collection: 'mySessions'
});

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on ('error', (err) => {
	console.log(err);
	process.exit(-1);
});

// Catch errors
store.on('error', function(error) {
	console.log(error);
});

// sessions stuff
app.use(session({
	secret: "keyboardcat",
	name: "mycookie",
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 6000000
	}
}));

// Apps
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Controllers
var userController = require('./controllers/user.js');
app.use('/api/user', userController);

var applicationController = require('./controllers/applications.js');
app.use('/api/applications', applicationController);

var sessionsRouter = require('./controllers/sessions.js');
app.use('/api/sessions', sessionsRouter);

// Index Controller
app.get('/', function(req, res) {
	console.log('home page');
});

// Server Port
app.listen(process.env.PORT || 5000, () => {
	console.log('I\'m listening on 5000');
});
