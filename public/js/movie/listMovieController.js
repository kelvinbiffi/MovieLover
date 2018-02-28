app.controller('listMovieController', function($scope, $http, loginService, movieService) {
  $scope.login = loginService;

  $scope.movieService = movieService;

  $scope.addNewMovie = function(){
    movieService.clearMovie();
    movieService.openAddMovie = true;
  };

  var getInfoFromList = function(movie){
    Object.keys(movieService.movie).map(function(k) {
      movieService.movie[k] = (k == "categoria" ? "" + movie[k] : movie[k]);
    });
  };

  $scope.openMovieDetails = function(movie){
    getInfoFromList(movie);
    movieService.openMovieDetails = true;
  };

  $scope.editMovie = function(movie){
    getInfoFromList(movie);
    movieService.openAddMovie = true;
  };

  $scope.deleteMovie = function(movie){
    getInfoFromList(movie);
    movieService.openDeleteMovie = true;
  };

});
