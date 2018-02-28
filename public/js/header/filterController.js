app.controller('filterController', function($scope, $http, movieService, filterService) {

  $scope.movieService = movieService;
  $scope.filterService = filterService;

  $scope.filterBy = function(filter){
    movieService.orderMovies = filter;
  }

  $scope.hideFilter = function(){
    filterService.openFilter = false;
  }

});
