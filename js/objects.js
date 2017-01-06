
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
    $("#output").append('<div class="doctor '+ id +'"></div>');
    if (street2) {
      $("." + id).append(image + first + last + title + specialties + phone +  street1 + "<p>" + street2 + "</p>"+ city + state);
    } else {
      $("." + id).append(image + first + last + title + specialties + phone +  street1 + city + state);
    }
  });
};



exports.doctorsModule = DoctorsResults;
