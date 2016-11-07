var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectId;

module.exports = function(id,newVote,newOptions){
    
  
    var url = process.env.MONGO_URL;
    var objId = new ObjectId(id);
  
  
    MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to post server");

    updateDocuments(db, function() {
    db.close();
  });
    });
    
    
    
    var updateDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('polls');
  
  collection.updateOne({_id:objId}, {$set: {vote:newVote, options:newOptions}, $inc:{"count":1}});
  console.log("Poll updated");
  
};
};

