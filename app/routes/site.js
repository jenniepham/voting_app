var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  
  
  
module.exports = function(app){
    

app.get('/', function(request, response){
   

  response.render('index.ejs', {
            user : request.user // get the user out of session and pass to template
        });

});


app.get('/recent', function(request, response){
    response.render('recent.ejs', {
            user : request.user // get the user out of session and pass to template
        });
   
});

app.get('/popular', function(request, response){
    response.render('popular.ejs', {
            user : request.user // get the user out of session and pass to template
        });
   
});

app.get('/home',  isLoggedIn, function(request, response){
 
  
var user = request.user.local.username;
var pollList = [];

var findDocuments = function(db, callback) {
  var collection = db.collection('polls');
  collection.find({"user":user}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
    pollList = docs;
        response.render('home.ejs', {
            user : request.user, data: pollList
        }); 
  });        
};

var url = process.env.MONGO_URL;
  
  
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to get server");

    findDocuments(db, function() {
    db.close();
  
  });
    });
    

   

    
   
});

app.get('/login', function(request, response){
    response.render('login.ejs', {
            user : request.user, SUmessage: request.flash('signupMessage'), LImessage: request.flash('loginMessage') // get the user out of session and pass to template
        });
   
});

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
app.get('/polls', function(request, response){
 
  
var pollList = [];

var findDocuments = function(db, callback) {
  var collection = db.collection('polls');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
    pollList = docs;
        response.render('polls.ejs', {
            user : request.user, data: pollList
        }); 
  });        
};

var url = process.env.MONGO_URL;
  
  
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to get server");

    findDocuments(db, function() {
    db.close();
  
  });
    });
    

   

    
   
});

    
};




function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}