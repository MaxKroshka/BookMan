angular.module('bookman.lists', [])

.controller('ListsCtrl', function ($scope) {
  $scope.data = {};
  $scope.data.lists = [{name: 'Learning'},{name: 'Info'},{name: 'Learning'},{name: 'Info'}];

});
