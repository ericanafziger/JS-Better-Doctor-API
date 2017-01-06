var getDoctors = require('./../js/api-call.js').getDoctors;

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var medicalIssue = $("input.symptom").val();
    //api call with passed medical issue
    getDoctors(medicalIssue);

    $('#output').show();
  });
});
