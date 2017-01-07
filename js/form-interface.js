var getDoctors = require('./../js/submit-call.js').getDoctors;
var getSymptoms = require('./../js/initial-call.js').getDoctors;
var apiKey = require('./../.env').apiKey;

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var medicalIssue = $("input.symptom").val();
    var location = $("select").val();
    var sort = $("select.sort").val();
    if (sort === "Sort by") {
      sort = "rating-desc";
      getDoctors(medicalIssue, location, sort);
      $('html, body').animate({
         scrollTop: $("#top").offset().top
     }, 2000);
   } else {
     //api call with passed medical issue, location, and sort method
     getDoctors(medicalIssue, location, sort);
     $('html, body').animate({
       scrollTop: $("#top").offset().top
     }, 2000);
   }

  });
});
