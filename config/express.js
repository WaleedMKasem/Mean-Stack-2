// Load the module dependencies
const config = require('./config');
const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// Define the Express configuration method
module.exports = function(db) {
	// Create a new Express application instance
	const app = express();

	// Create a new HTTP server
	const server = http.createServer(app);

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json()); 
	app.use(methodOverride());

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Configure the flash messages middleware
	app.use(flash());

	// Configure static file serving
	app.use('/', express.static(path.resolve('./public')));
	app.use('/lib', express.static(path.resolve('./node_modules')));

	// Load the routing files		
	// require('../app/index/index.route.js')(app);
	require('../app/article/article.route.js')(app);

	// Return the Server instance
	return server;
};