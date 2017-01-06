
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
      $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + '</h3><h3>' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p><p>'+ streetAddress2 +'</p><p>'+ city +' '+ state +'</p></div>');    
    } else {
      $("#output").append('<div class="doctor"><img src='+ image +'><h3>' + firstName + ' ' + lastName + '</h3><h3>' + title + '</h3><h4>' + specialties + '</h4><p>'+ streetAddress +'</p>'+ city +' '+ state +'</p></div>');
    }

  });
};



exports.doctorsModule = Doctors;
