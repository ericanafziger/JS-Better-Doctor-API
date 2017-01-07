var apiKey = require('./../.env').apiKey;


exports.getSymptoms = function() {
  //calls get symptoms api

    $.get('https://api.betterdoctor.com/2016-03-01/conditions?limit=50&user_key=' + apiKey)
    .then(function(response) {
      console.log(response);
    })
    .fail(function(error){
      console.log(error);
    });

};
