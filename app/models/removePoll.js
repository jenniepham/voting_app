

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  var ObjectId = require('mongodb').ObjectId;
  

module.exports = function(id){
    var url = process.env.MONGO_URL;
  
   var idd = new ObjectId(id);  
  
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to get server");

        removeDocument(db, function() {
        db.close();
  
        });
       });
     
      var removeDocument = function(db, callback) {

       var collection = db.collection('polls');

       collection.deleteOne({_id:idd}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the id" + id);
        callback(result);

       
        });    
      };
};

