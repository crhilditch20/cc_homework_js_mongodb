var MongoClient = require('mongodb').MongoClient; //database driver. lets us talk in javascript to Mongo in our web app

var FilmQuery = function() {
  this.url = 'mongodb://localhost:27017/ratings_site'; //this is a specific mongodb url
};

FilmQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('films');
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    })
  },
  add: function(data, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
    
      var collection = db.collection('films');
      collection.insert(data);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      })
    })
  }
};

module.exports = FilmQuery;