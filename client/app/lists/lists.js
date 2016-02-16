angular.module('bookman.lists', [])

.controller('ListsCtrl', function ($scope) { // Add Lists factory later
  $scope.data = {};
  $scope.data.lists = [];
  $scope.showInput = false;

  // Lists.getLists().then(function(data){
    // $scope.data.lists = data;
  // });

  $scope.addList = function(){
    // Lists.addList({name: $scope.listName})
    $scope.data.lists.push({name: $scope.listName}); // Remove later
    $scope.toggleInput();
    $scope.listName = '';
  };

  $scope.toggleInput = function(){
    $scope.showInput = !$scope.showInput;
  };
});
