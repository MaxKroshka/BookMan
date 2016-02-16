angular.module('bookman.lists', [])

.controller('ListsCtrl', function($scope, $rootScope, Lists) {
  $scope.data = {};
  $scope.data.lists = [];
  $scope.showInput = false;
  Lists.getLists().then(function(data) {
    $scope.data.lists = data;
  });

  $scope.addList = function() {
    $scope.toggleInput();
    Lists.addList({ name: $scope.listName })
      .then(function(res) {
        $scope.data.lists.push({ name: res.data.name });
        $rootScope.activeTab = res.data.name;
      });
    $scope.listName = '';
    
  };

  $scope.changeTab = function(tabName){
    $rootScope.activeTab = tabName;
  };

  $scope.toggleInput = function() {
    $scope.showInput = !$scope.showInput;
  };
});
