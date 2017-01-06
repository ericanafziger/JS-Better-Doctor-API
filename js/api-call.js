var apiKey = require('./../.env').apiKey;
var Doctors = require('./../js/objects.js').doctorsModule;

exports.getDoctors = function(medicalIssue, location) {
  //calls api
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+location+'%2C%205&user_location='+location+'&skip=0&limit=20&user_key=' + apiKey)
  .then(function(response) {
    var DoctorsList = new Doctors();
    //sets api response to results array of object
    DoctorsList.setResults(response);
    //adds doctors to the DoctorsList array
    DoctorsList.addDoctors();
    DoctorsList.displayResults();
  })
  .fail(function(error){
    console.log("fail");
  });

};
