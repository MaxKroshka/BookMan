// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('bookman.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.failed = true;

  $scope.signin = function (boolean) {
    if (boolean) {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.bookman', token);
          $location.path('/links');
        })
        .catch(function (error) {
          $scope.failed = false;
          console.error(error);
        });
    }
  };

  $scope.signup = function (boolean) {
    if (boolean) {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.bookman', token);
          $location.path('/links');
        })
        .catch(function (error) {
          $scope.failed = false;
          console.error(error);
        });
    }
  };

});
