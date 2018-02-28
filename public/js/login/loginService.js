app.service('loginService', function($window, $http, messageService, spinnerService) {
  this.openModal = false;
  this.logged = false;

  var self = this;

  this.openLoginModal = function(){
    this.openModal = true;
  };

  this.closeLoginModal = function(){
    this.openModal = false;
  };

  this.logout = function(){
    spinnerService.showSpinner();
    $http({
          url: '/api/token', // No need of IP address
          method: 'DELETE',
          data: {token: $window.localStorage.getItem('token')},
          headers: {'Content-Type': 'application/json'}
    }).then(function (success){
      console.log("Login successfully: ", success);
      $window.localStorage.removeItem('token'); //Remove token from local storage
      self.logged = false; // set status to logout
      messageService.showMessage('success', "Usuário desconectado!");
      spinnerService.hideSpinner();
    },function (error){
      console.error("Login error: ", error);
      messageService.showMessage('error', error.data.error);
      spinnerService.hideSpinner();
    });
  }

  this.checkLogin = function(){
    if($window.localStorage.getItem('token')){
      this.logged = true;
    }
  };

});
