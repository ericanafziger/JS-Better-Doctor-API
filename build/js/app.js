(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "35fdc865fda6b32039076c66df3c78d7";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
var Doctors = require('./../js/objects.js').doctorsModule;

exports.getDoctors = function(medicalIssue) {
  //calls api
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
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

},{"./../.env":1,"./../js/objects.js":3}],3:[function(require,module,exports){

function DoctorsResults() {
  this.results = [];
  this.doctors = [];
}

function Doctor() {
  this.firstName = "";
  this.lastName = "";
  this.drTitle = "";
  this.image = "";
  this.specialties = "";
  this.streetAddress = "";
  this.streetAddress2 = "";
  this.city = "";
  this.state = "";
}

DoctorsResults.prototype.setResults = function (apiReturn) {
    this.results = apiReturn;
};

DoctorsResults.prototype.addDoctors = function () {
  var Results = [];
  $("#output").html("");
  this.results.data.forEach(function(item) {
    var NewDoctor = new Doctor();
    NewDoctor.idNumber = item.npi;
    NewDoctor.firstName = item.profile.first_name;
    NewDoctor.lastName = item.profile.last_name;
    NewDoctor.drTitle = item.profile.title;
    NewDoctor.image = item.profile.image_url;
    NewDoctor.specialties = item.specialties[0].actor;
    NewDoctor.streetAddress = item.practices[0].visit_address.street;
    NewDoctor.streetAddress2 = item.practices[0].visit_address.street2;
    NewDoctor.city = item.practices[0].visit_address.city;
    NewDoctor.state = item.practices[0].visit_address.state;
    Results.push(NewDoctor);
    // if (streetAddress2) {
    //   $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + ', ' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p><p>'+ streetAddress2 +'</p><p>'+ city +' '+ state +'</p></div>');
    // } else {
    //   $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + ', ' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p><p>'+ city +' '+ state +'</p></div>');
    // }
  });
  this.doctors.push(Results);
};

DoctorsResults.prototype.displayResults = function () {
  this.doctors[0].forEach(function(DoctorObject) {
    var id = DoctorObject.idNumber;
    var first = "<h3>" + DoctorObject.firstName;
    var last = " " + DoctorObject.lastName;
    var title = ", " + DoctorObject.drTitle + "</h3>";
    var image = "<img src='"+ DoctorObject.image +"'>";
    var specialties = "<h4>" + DoctorObject.specialties + "</h4>";
    var street1 = "<p>" + DoctorObject.streetAddress + "</p>";
    var street2 = DoctorObject.streetAddress2;
    var city = "<p>" + DoctorObject.city + "</p>";
    var state = "<p>" + DoctorObject.state + "</p>";
    $("#output").append('<div class="doctor '+ id +'"></div>');
    if (street2) {
      $("." + id).append(image + first + last + title + specialties + street1 + "<p>" + street2 + "</p>"+ city + state);
    } else {
      $("." + id).append(image + first + last + title + specialties + street1 + city + state);
    }
  });
};



exports.doctorsModule = DoctorsResults;

},{}],4:[function(require,module,exports){
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

},{"./../js/api-call.js":2}]},{},[4]);
