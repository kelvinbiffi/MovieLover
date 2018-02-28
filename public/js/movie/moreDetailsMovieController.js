app.controller('moreDetailsMovieController', function($scope, $http, $window, loginService, messageService, movieService, spinnerService) {

    $scope.login = loginService;
    $scope.movieService = movieService;

    $scope.closeMoreDetailsMovie = function(){
      movieService.openMovieDetails = false;
    }

    $scope.getCategoryName = function(categoria){
      var cat = "";
      for (var i = 0; i < movieService.categorias.length; i++) {
        if (movieService.categorias[i].codigo == movieService.movie.categoria) {
          cat = movieService.categorias[i].categoria;
        }
      }
      return cat;
    };

    $scope.$watch('movieService', function(obj){
      if(obj.openAddMovie || obj.openDeleteMovie || obj.openMovieDetails){
        document.querySelector("body").classList.add("no-scroll");
      }else{
        document.querySelector("body").classList.remove("no-scroll");
      }
    }, true);

});
