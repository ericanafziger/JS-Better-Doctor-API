var apiKey = require('./../.env').apiKey;
var Search = require('./../js/form.js').searchModule;

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var userSymptom = $("input.symptom").val();
    console.log(userSymptom);
  });
});
