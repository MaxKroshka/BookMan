angular.module('bookman.lists', [])

.controller('ListsCtrl', function($scope, $rootScope, Lists, $location) {
  $scope.data = {};
  $scope.data.lists = [];
  $scope.showInput = false;
  $scope.something = $rootScope.search;
  $scope.$watch(function() {
    return $rootScope.flag;
  }, function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.initialize();
    }
  });

  $scope.initialize = function() {
    Lists.getLists().then(function(data) {
      console.log(data);
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

  $scope.changeTab = function(tabName) {
    if ($rootScope.deleteMode) {
      Lists.removeList({ name: tabName })
        .then(function(res) {
          $scope.initialize();
          $rootScope.deleteMode = false;
          $location.path('/bookmarks');
        });
    } else {
      $rootScope.activeTab = tabName;
    }
  };

  $scope.toggleInput = function() {
    $scope.showInput = !$scope.showInput;
  };

  $scope.deleteMode = function() {
    $rootScope.deleteMode = !$rootScope.deleteMode;
  };

  $scope.initialize();
});
