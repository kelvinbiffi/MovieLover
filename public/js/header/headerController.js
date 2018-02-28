app.controller('headerController', function($scope, $http, loginService, filterService) {

  $scope.login = loginService;

  $scope.openFilter = function(){
    filterService.openFilter = true;
  };

});
