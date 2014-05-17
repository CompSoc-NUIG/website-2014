
/*
NodeJS server application for OpenShift using express
*/
var express = require('express');
var app = express();
var debug = require('debug')('http');
var http = require('http');
var path = require('path');
var router = require('./routes');

/*
Environment Variables
*/

//running on OpenShift?
if (process.env.hasOwnProperty("OPENSHIFT_NODEJS_IP")) {
	app.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
	app.port      = process.env.OPENSHIFT_NODEJS_PORT;
} else {
	//otherwise assume running locally in test environment
	app.ipaddress = "0.0.0.0";
	app.port = "3000";
}


/*
Define Middlewares
*/

//DON'T PLACE ANY APP.USE CALLS ABOVE COMPRESS.

//send static data compressed with gzip.
app.use(express.compress());

//serve static files from the public directory (relative to the current directory by using the '__dirname' var)
app.use('/public', express.static(__dirname + '/public', { maxAge: 0 }));

//directory containing partials and views
app.set('views', __dirname + '/views');

//parses the post body of requests into request.body 
app.use(express.bodyParser());

//allows using PUT and DELETE along with GET and POST requests
app.use(express.methodOverride());

//allows defining of routes and routing variables
app.use(app.router);


/*
* Define routes
*/


app.get('/', router.homepage);
app.get('/partials/:name', router.partials);
//api functions for all REST verbs
app.get('/api/:controller/:method', router.api);
app.put('/api/:controller/:method', router.api);
app.post('/api/:controller/:method', router.api);
app.delete('/api/:controller/:method', router.api);


/*
*	run server
*/
app.listen(app.port, app.ipaddress);