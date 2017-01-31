var Film = require('./film');
var Review = require('./review');

var Films = function() {
};

Films.prototype = {
  makeRequest: function(url, callback, type){
    var request = new XMLHttpRequest();
    request.open(type || 'GET', url); //if we don't pass a type it'll default to 'GET'
    request.onload = callback;
    request.send();
  },

  makePostRequest: function(url, callback, data){
    console.log(data);
    var newData = JSON.stringify(data); //have to stringify the data that comes back from the form
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("content-type", "application/json");
    request.onload = callback;
    request.send(newData);

  },

  all: function(callback){
    var self = this; //because you'll lose the scope of 'this' in the function below - this is the 'Films' object itself, and we can't use bind(this) because 'this' refers to 2 things. I think.
    this.makeRequest("http://localhost:3000/api/films", function(){
      if (this.status !== 200){
          return;
      }
      var jsonString = this.responseText; //'this' is the request object
      var results = JSON.parse(jsonString); 
      var films = self.populateFilms(results);
      callback(films); //the callback is defined in the UI.js file
    });
  },
  populateFilms: function(results){
    var films = [];
      for(var result of results){
        var film = new Film(result); //takes the data and passes it to the Film constructor to create a new Film object for each one
        films.push(film);
      }
    return films;
  }
};

module.exports = Films;
