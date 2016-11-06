var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectId

module.exports = function(app){

var addPoll = require("../models/newPoll.js");    
var addVote = require("../models/newVote.js");  
    
    app.post('/home/form', function(request, response){
   
   var form = request.body;
   var user = request.user.local.username;
   var question = form.question;
   var options = [];
   var vote = [];
   var size = Object.keys(form).length;
   
   for (var i = 1; i<size; i++){
       
      options.push(form["option"+i]);
      vote.push(0);
   }
   
   console.log("user:" + user);
   console.log("question:" + question);
   console.log({"options": options});
   console.log({"vote": vote});

   addPoll(user,question,options,vote);
   
   
   response.redirect("/home");

   
   });
   
   
   app.get('/:id', function(request, response){
      
      var id = request.params.id;
      id = new ObjectId(id);
      var pollData = [];
      var test = "test";
      
      var findDocuments = function(db, callback) {
      var collection = db.collection('polls');
    collection.find({_id:id}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    console.log(id);
    callback(docs);
    pollData = docs;
        response.render('pollPage.ejs', {
            user : request.user, data: pollData
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
   
   
   app.post('/:id', function(request,response){
       
          
      var id = request.params.id;
      var idd = id;
      id = new ObjectId(id);
      var choice = request.body.choice;
      
      var findDocuments = function(db, callback) {
       var collection = db.collection('polls');
       collection.find({_id:id}).toArray(function(err, docs) {
       assert.equal(err, null);
       console.log("Found the following records");
       console.log(docs);
       callback(docs);
       
       var option = docs[0]['options'];
       var vote = docs[0]['vote'];
       
       var selectedOption = option.indexOf(choice);
       
       vote[selectedOption] ++;
       
       console.log(vote);
       
       addVote(idd,vote);
       response.redirect("/"+idd);
      
       
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