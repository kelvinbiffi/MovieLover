app.service('spinnerService', function($window, $http, messageService) {

  this.displaySpinner = true;

  this.showSpinner = function(){
    this.displaySpinner = true;
  };

  this.hideSpinner = function(){
    this.displaySpinner = false;
  };


});
