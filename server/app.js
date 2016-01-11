/**
 * Created by Scott on 1/9/16.
 */
//  require Express
var express = require('express');

//  require BodyParser
var bodyParser = require('body-parser');

//  bring in Express and create an instance of Express called app
var app = express();

//  require index info (initially work up to directory root and back down to index.js in 'routes' with ../)
//  require index info (move 'routes' directory under server and work up to directory 'server' and back down to index.js in 'routes' with ./)
var index = require('./routes/index');

//  require Path
var path = require('path');

//  use variable index at the root path (localhost:3000)
//app.use('/', index);

//  serve static content
app.use(express.static(path.join(__dirname,'./public')));

//  set up a server and pass in the port to listen on and a callback function (anonymous function)
//  to activate the server
//  'port' variable is set equal to global server variable's address method that has port property
var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

//  allow use of BodyParser and tighten up a few last things for use of the code throughout the application
app.use(bodyParser.json());
app.use('/', index);

module.exports = app;