var getDoctors = require('./../js/api-call.js').getDoctors;

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var medicalIssue = $("input.symptom").val();
    var location = $("select").val();
    console.log(location);
    //api call with passed medical issue
    getDoctors(medicalIssue, location);
    $('html, body').animate({
       scrollTop: $("#top").offset().top
   }, 2000);

  });
});
