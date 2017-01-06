var apiKey = require('./../.env').apiKey;
var getDoctors = require('./../js/api-call.js').getDoctors;
var Doctors = require('./../js/objects.js').doctorsModule;

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var medicalIssue = $("input.symptom").val();
    var results = getDoctors(medicalIssue);

    $('#output').show();
  });
});
