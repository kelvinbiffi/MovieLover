app.controller('deleteMovieController', function($scope, $http, loginService, messageService, movieService, spinnerService) {

    $scope.login = loginService;
    $scope.movieService = movieService;

    $scope.deleteMovie = function(){
      if(movieService.validData()){
        spinnerService.showSpinner();
        $http({
              url: '/api/movie', // No need of IP address
              method: 'DELETE',
              data: $scope.movieService.movie,
              headers: {'Content-Type': 'application/json'}
        }).then(function (success){
          console.log("Delete movie successfully: ", success);
          $scope.movieService.openDeleteMovie = false;
          messageService.showMessage('success', success.data.msg);
          movieService.getMovies();
        },function (error){
          console.error("Delete movie error: ", error);
          $scope.movieService.openDeleteMovie = false;
          messageService.showMessage('error', error.data.error);
          spinnerService.hideSpinner();
        });
      }
    };

    $scope.closeModalDeleteMovie = function(){
      movieService.clearMovie();
      movieService.openDeleteMovie = false;
    };

});
