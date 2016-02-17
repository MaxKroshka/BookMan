angular.module('bookman.lists', [])

.controller('ListsCtrl', function($scope, $rootScope, Lists) {
  $scope.data = {};
  $scope.data.lists = [];
  $scope.showInput = false;
  $scope.something = $rootScope.search;
  $scope.$watch(function () { return $rootScope.flag; }, function (newValue, oldValue){
     if (newValue !== oldValue) $scope.initialize();
  });

  $scope.initialize = function() {
    Lists.getLists().then(function(data) {
      $scope.data.lists = data;
    });
  };

  $scope.addList = function() {
    $scope.toggleInput();
    Lists.addList({ name: $scope.listName })
      .then(function(res) {
        $scope.initialize();
      });
    $scope.listName = '';
    
  };

  $scope.changeTab = function(tabName){
    $rootScope.activeTab = tabName;
  };

  $scope.toggleInput = function() {
    $scope.showInput = !$scope.showInput;
  };
  
  $scope.initialize();
});
