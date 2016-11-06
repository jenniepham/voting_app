var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  

module.exports = function(user,q,o,vote){
    
  
    var url = process.env.MONGO_URL;
  
  
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to post server");

    insertDocuments(db, function() {
    db.close();
  });
    });
    
    
    
    var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('polls');
  collection.insert({"user": user, "question": q, "options": o, "vote": vote, "count":0});
  console.log("Added new poll as so");
  console.log({"user": user, "question": q, "options": o, "vote": vote, "count":0});
  
};
};

