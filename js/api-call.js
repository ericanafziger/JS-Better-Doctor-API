var apiKey = require('./../.env').apiKey;
var Doctors = require('./../js/objects.js').doctorsModule;

exports.getDoctors = function(medicalIssue, location, sort) {
  //calls api
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+location+'%2C%205&user_location='+location+'&sort='+sort+'&skip=0&limit=20&user_key=' + apiKey)
  .then(function(response) {
    var DoctorsList = new Doctors();
    //sets api response to results array of object
    DoctorsList.setResults(response);
    if (response.data.length > 0) {
      //adds doctors to the DoctorsList array
      DoctorsList.addDoctors();
      DoctorsList.displayResults();
      $('.error').html("");
      $('#output').show();
      $(".doctor").click(function() {
        var id = this.id;
        $(".bio."+this.id).toggle();
      });
    } else {
      $('#output').hide();
      $('#info').hide();
      $('.error').html("<h3>Sorry the symptom you entered cannot be found.</h3>");
    }
  })
  .fail(function(error){
    $('#output').hide();
    $('#info').hide();
    $('.error').html("<h3>Sorry the symptom you entered cannot be found.</h3>");
  });

};
