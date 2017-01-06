(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "35fdc865fda6b32039076c66df3c78d7";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
var Doctors = require('./../js/objects.js').doctorsModule;

exports.getDoctors = function(medicalIssue) {

  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
  .then(function(response) {
    var DoctorsList = new Doctors();
    DoctorsList.setResults(response);
    var firstName = DoctorsList.setName();
  })
  .fail(function(error){
    console.log("fail");
  });

};

},{"./../.env":1,"./../js/objects.js":3}],3:[function(require,module,exports){

function Doctors() {
  this.results = [];
}

Doctors.prototype.setResults = function (apiReturn) {
    this.results = apiReturn;
};

Doctors.prototype.setName = function () {
  $("#output").html("");
  this.results.data.forEach(function(item) {
    var firstName = item.profile.first_name;
    var lastName = item.profile.last_name;
    var title = item.profile.title;
    var image = item.profile.image_url;
    var specialties = item.specialties[0].actor;
    var streetAddress = item.practices[0].visit_address.street;
    var streetAddress2 = item.practices[0].visit_address.street2;
    var city = item.practices[0].visit_address.city;
    var state = item.practices[0].visit_address.state;
    if (streetAddress2) {
      $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + ', ' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p><p>'+ streetAddress2 +'</p><p>'+ city +' '+ state +'</p></div>');
    } else {
      $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + ', ' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p><p>'+ city +' '+ state +'</p></div>');
    }
  });
};



exports.doctorsModule = Doctors;

},{}],4:[function(require,module,exports){
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

},{"./../.env":1,"./../js/api-call.js":2,"./../js/objects.js":3}]},{},[4]);
