(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "35fdc865fda6b32039076c66df3c78d7";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
var Doctors = require('./../js/objects.js').doctorsModule;

exports.getDoctors = function(medicalIssue, location) {
  //calls api
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location='+location+'%2C%205&user_location='+location+'&sort=rating-desc&skip=0&limit=20&user_key=' + apiKey)
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
      $('.error').html("<h3>Sorry the symptom you entered cannot be found.</h3>");
    }
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
    NewDoctor.phone = item.practices[0].phones[0].number;
    NewDoctor.bio = item.profile.bio;
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
  });
  this.doctors.push(Results);
};

DoctorsResults.prototype.displayResults = function () {
  this.doctors[0].forEach(function(DoctorObject) {
    var id = DoctorObject.idNumber;
    var bio = "<p>" + DoctorObject.bio + "</p>";
    var first = "<h3>" + DoctorObject.firstName;
    var last = " " + DoctorObject.lastName;
    var title = ", " + DoctorObject.drTitle + "</h3>";
    var phone = "<h5>(" + DoctorObject.phone.slice(0,3) + ") " + DoctorObject.phone.slice(3,6) + "-" + DoctorObject.phone.slice(6,10) + "</h5>";
    var image = "<img src='"+ DoctorObject.image +"'>";
    var specialties = "<h4>" + DoctorObject.specialties + "</h4>";
    var street1 = "<p>" + DoctorObject.streetAddress + "</p>";
    var street2 = DoctorObject.streetAddress2;
    var city = "<p>" + DoctorObject.city;
    var state = ", " + DoctorObject.state + "</p>";
    $("#info").show();
    $("#output").append('<div class="doctor" id="'+ id +'"></div>');
    $("#output #" + id).append('<div class="bio '+ id +'"></div>');
    $(".bio." + id).append(bio);
    if (street2) {
      $(".doctor#" + id).append(image + first + last + title + specialties + phone +  street1 + "<p>" + street2 + "</p>"+ city + state);
    } else {
      $(".doctor#" + id).append(image + first + last + title + specialties + phone +  street1 + city + state);
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
    var location = $("select").val();
    console.log(location);
    //api call with passed medical issue
    getDoctors(medicalIssue, location);
    $('html, body').animate({
       scrollTop: $("#top").offset().top
   }, 2000);

  });
});

},{"./../js/api-call.js":2}]},{},[4]);
