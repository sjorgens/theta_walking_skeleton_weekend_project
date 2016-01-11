/**
 * Created by Scott on 1/9/16.
 */
// declare Express (bring in) again to variable 'express'
var express  = require('express');

// declare Router (bring in) to variable 'router' from a return of the router method of the express object
var router = express.Router();

// declare Path (hook into code for use in app)
var path = require('path');

// delcare use of Mongoose
var mongoose = require('mongoose');

// connect to database with connect()  db name = 'basic_walking_skeleton'
mongoose.connect('mongodb://localhost/basic_walking_skeleton');

// declare basic model of 'Cat' data to be brought into db
var Cat = mongoose.model('Cat', {name:String});

//  the calls that handle GET and POST when we hit /cats route and the /add route
//  in post - create new instance of Cat object and set name equal to request.body.name (from Angular input field); then call .save of Mongoose to toss it back to the db
//  in get - return results of querying the db for everything; in the response, send down a JSON version of the cats db
router.post('/add', function(request, response, next){
    var kitty = new Cat({name: request.body.name});
    kitty.save(function(err){
        if(err) console.log('meow %s', err);
        response.send(kitty.toJSON());
        next();
    });
});
router.get('/cats', function(request, response, next){
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        response.send(JSON.stringify(cats));
        next();
    });
});

// call the get method on the 'router' object
// call anonymous function with arguments 'request', 'response', and 'next'
// 'next' is how Express handles middleware
// now that static files are served from '/server/public', we can change router.get to new code below
//router.get('/', function(request, response, next){
//    console.log('Here is a console log');                //this writes to the terminal window once you refresh the browser to localhost:3000
//    //response.send('Hello World!');                      //this writes to the browser window
//    var file = request.params[0] || 'views/index.html';   //declare 'file' set to possible params coming in on request or if not there, setting equal to index.html
//    response.sendFile(path.join(__dirname, '../public', file));      //set up response with proper path to the needed file
//    //next();                                                       //for future use
//});

// we can remove the 'file' param in response.sendFile(), since static files now are served from '/server/public' folder
router.get('/', function(request, response, next){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// issue an export order to the router to be a module
// make 'router' available to us throughout rest of application
module.exports = router;