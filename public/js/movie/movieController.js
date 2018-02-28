app.controller('movieController', function($scope, $http, $window, loginService, messageService, movieService, spinnerService) {

    $scope.login = loginService;
    $scope.movieService = movieService;

    $scope.movieService.getCategorias();

    $scope.save = function(){
      if(movieService.validData()){
        spinnerService.showSpinner();
        $http({
              url: '/api/movie', // No need of IP address
              method: 'POST',
              data: $scope.movieService.movie,
              headers: {'Content-Type': 'application/json'}
        }).then(function (success){
          console.log("Register movie successfully: ", success);
          $scope.movieService.openAddMovie = false;
          messageService.showMessage('success', success.data.msg);
          movieService.getMovies();
        },function (error){
          console.error("Register movie error: ", error);
          messageService.showMessage('error', error.data.error);
          spinnerService.hideSpinner();
        });
      }
    };

    $scope.closeModalDataMovie = function(){
      movieService.clearMovie();
      movieService.openAddMovie = false;
    };

});
