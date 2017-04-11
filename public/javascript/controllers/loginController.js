angular.module('texasfossils').controller('LoginController', [
  '$scope',
  '$location',
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {
    
    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthenticationService.login(
        $scope.loginForm.username,
        $scope.loginForm.password)
        // handle success
        .then(function () {
          $scope.disabled = false;
          AuthenticationService.setUsername($scope.loginForm.username);
          $scope.loginForm = {};
          $location.path('/galleryAdmin');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

    // Shouldn't need this but just in case (future functionality).
    // See routes/api.js
    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $location.path('/register');
      $scope.disabled = false;
      $scope.loginForm = {};
    };
  }]);
