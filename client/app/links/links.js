angular.module('bookman.links', [])

.controller('LinksController', function($scope, $rootScope, Links, $window) {

  $scope.data = {};
  $scope.data.links = [];

  $scope.initialize = function() {
    Links.getLinks().then(function(data) {
      $scope.data.links = data;
    });
  };

  $scope.addUrl = function() {
    Links.addLink({ url: $scope.newUrl, tab: $rootScope.activeTab })
      .then(function(res) {
        $scope.data.links.push(res.data);
      });
    $scope.newUrl = '';
  };

  $scope.toggleEvent = function(url, event) {
    Links.toggleEvent({ url: url, event: event }).then(function(res) {
        $scope.initialize();
    });
  };

  $scope.removeUrl = function(url){
    Links.removeLink({url: url}).
    then(function(res){
      $scope.initialize();
    });
  };

  $scope.openTab = function(url){
    console.log('clicked');
    $window.open(url, '_blank');
  };

  $scope.initialize();
});
