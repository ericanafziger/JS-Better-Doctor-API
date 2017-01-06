
function Search() {
  this.results = [];
}

Search.prototype.resultsSet = function(array) {
  this.results = array;
};

Search.prototype.posterSet = function() {
  this.results.results.forEach(function(item){
    var id = item.id;
    var image = item.poster_path;
    var poster;
    if (image) {
      poster = "<img id='" + id + "' class='poster' src='http://image.tmdb.org/t/p/w185/" + image + "'>";
      $("#output").append("<div class='movie'>" + poster + "</div>");
    }
  });
};
Search.prototype.actorToMovie = function() {
  $('#output').html("");
  debugger;
  this.results.cast.forEach(function(item){
    var id = item.id;
    var image = item.poster_path;
    var poster;
    if (image) {
      poster = "<img id='" + id + "' class='poster' src='http://image.tmdb.org/t/p/w185/" + image + "'>";
      $("#output").append("<div class='movie'>" + poster + "</div>");
    }
  });
};

Search.prototype.inputSet = function(movie) {
  var title = movie.title;
  var id = movie.id;
  $('input').val(title);
  $('form').trigger('submit');
};

Search.prototype.titleSet = function(movie) {
  var title = movie.title;
  var date = movie.release_date;
  var id = movie.id;
  var overview = movie.overview;
  var budget = movie.budget;

  var genres = [];
  genres.push(movie.genres[0].name, movie.genres[1].name);
  genres = genres.join(" and ");

  var backdrop;
  var backdropImage = movie.backdrop_path;
  if (backdropImage) {
    backdrop = "http://image.tmdb.org/t/p/original/" + backdropImage;
  }
  $('#outputDetail .movieDetails').append("<h2>"+title+"</h2><h6>Release date: "+date+"</h6><h6>Genre: "+ genres+"</h6><p>"+overview+"</p>");
  $('#outputDetail').css('background-image', 'url('+ backdrop +')');

};

Search.prototype.actorSet = function() {
  this.results.results.forEach(function(item){
    var name = item.name;
    // var knownFor = item.known_for[0].title;
    var actorId = item.id;
    var photo = item.profile_path;
    var image;
    if (photo) {
      image = "<img class='image' id='"+actorId+"' src='http://image.tmdb.org/t/p/w185/" + item.profile_path + "'>";
      $("#output").append("<div class='headshot'><h3>" + name + "</h3>" + image + "</div>");
    }
  });
};

Search.prototype.cast = function (actors) {
  for (i=0; i<6; i++) {
    var name = actors.cast[i].name;
    var character = actors.cast[i].character;
    var id = actors.cast[i].id;
    var profileImage = actors.cast[i].profile_path;
    var profile;
    if (profileImage) {
      profile = "<img class='image' id='"+id+"' src='http://image.tmdb.org/t/p/w185/" + actors.cast[i].profile_path + "'>";

      $("#outputDetail .actors").append("<div class='actor'><h3>" + name + "</h3><h5>Character: " + character + "</h5>" + profile + "</div>");
    }
  }
};
Search.prototype.filmography = function(films) {
  films.cast.forEach(function(film) {
    var filmId = film.id;
    var poster;
    var image = film.poster_path;
    if (image) {
      poster = "<img id='" + filmId + "' class='poster' src='http://image.tmdb.org/t/p/w185/" + image + "'>";
      $("#output").append("<div class='movie'>" + poster + "</div>");
    }
  });
};

exports.searchModule = Search;
