angular.module('bookman.lists', [])

.controller('ListsCtrl', function ($scope) {
  $scope.data = {};
  $scope.data.lists = [{name: 'Learning'},{name: 'Info'},{name: 'Learning'},{name: 'Info'}];
  $scope.showInput = false;

  $scope.addList = function(){
    console.log('Added list!');
  };

  $scope.toggleInput = function(){
    $scope.showInput = !$scope.showInput;
  };
});
