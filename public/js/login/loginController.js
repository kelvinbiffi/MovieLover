app.controller('loginController', function($scope, $http, $window, loginService, messageService, spinnerService) {

    $scope.login = loginService;
    $scope.login.checkLogin();

    $scope.data = {
      user: "",
      pass: ""
    };

    var successUser = function(success){
      spinnerService.hideSpinner();
      $window.localStorage.setItem('token',success.data.token);
      messageService.showMessage('success', success.data.msg);
      $scope.login.closeLoginModal();
      $scope.login.logged = true;
    }

    $scope.entrarBtn = function(){
      if ($scope.data.user == "" || $scope.data.pass == "") {
        messageService.showMessage('error', 'Você deve informar usuário e senha para realizar o login.');
      } else {
        spinnerService.showSpinner();
        $http({
              url: '/api/login', // No need of IP address
              method: 'POST',
              data: $scope.data,
              headers: {'Content-Type': 'application/json'}
        }).then(function (success){
          console.log("Login successfully: ", success);
          successUser(success);
        },function (error){
          console.error("Login error: ", error);
          messageService.showMessage('error', error.data.error);
        });
      }
    };

    $scope.registrarBtn = function(){
      if($scope.data.user.length < 3 || $scope.data.pass.length < 3) {
        messageService.showMessage('error', 'Usuário e senha devem ter no mínimo 3 caracteres.');
      }else{
        $http({
              url: '/api/register', // No need of IP address
              method: 'POST',
              data: $scope.data,
              headers: {'Content-Type': 'application/json'}
        }).then(function (success){
          console.log("Register successfully: ", success);
          successUser(success);
        },function (error){
          console.error("Register error: ", error);
          messageService.showMessage('error', error.data.error);
          spinnerService.hideSpinner();
        });
      }
    };

});
