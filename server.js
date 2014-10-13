#!/bin/env node
/*
NodeJS server application for OpenShift using express
*/
var express = require('express'),
    fs      = require('fs'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    serveStatic = require('serve-static'),
    methodOverride = require('method-override'),
    app = express(),
    router = express.Router();


/*
Environment Variables
*/

if (process.env.hasOwnProperty("OPENSHIFT_NODEJS_IP")) { //running on OpenShift?
    app.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    app.port      = process.env.OPENSHIFT_NODEJS_PORT;
} 
else if(process.env.hasOwnProperty("COMPSOC")){ //running on OpenShift?
    app.ipaddress = "0.0.0.0";
    app.port      = "3000";
} 
else {
	//otherwise assume running locally in test environment
	app.ipaddress = "0.0.0.0";
	app.port = "3000";
}

//send static data compressed with gzip.
//app.use(express.compress());                    
//allows using PUT and DELETE along with GET and POST requests
app.use(methodOverride());
//set static folders
app.use('/css', serveStatic(__dirname + '/public/css', { maxAge: 0 }));
app.use('/js', serveStatic(__dirname + '/public/js', { maxAge: 0 }));
app.use('/img', serveStatic(__dirname + '/public/img', { maxAge: 0 }));
app.use('/fonts', serveStatic(__dirname + '/public/fonts', { maxAge: 0 }));
app.use('/views', serveStatic(__dirname + '/public/views', { maxAge: 0 }));
//allows defining of routes and routing variables
app.use(router);
//parses the post body of requests into request.body 
app.use(bodyParser.json());
//middleware to log every response for debugging
app.use(function (req, res, next) {
  console.log('\n New request:')
  console.log('Time:', Date.now());
  console.log('Path : '+req.path);
  next();
});

// Send the main layout which pulls in the other pages to be displayed
app.get('/',function(req,res){
    res.redirect('/views/main.html');
});

//to force the server to fail
app.get('/fail',function(req,res){
    throw "error";
});


// This route needs to be at the last defined to catch any 
// other undefiend routes and redirect them home
app.get('*',function(req,res){
  console.log("Redirect to root")
  res.redirect('/');
});
//run server
app.listen(app.port,app.ipaddress); 
console.log("server running @"+app.ipaddress+":"+app.port);