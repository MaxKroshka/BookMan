angular.module('bookman.links', [])

.controller('LinksController', function ($scope) {

  $scope.data = {};
  $scope.data.links = [{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'},{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'},{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'}];

  // Links.getLinks().then(function (data) {
  //   $scope.data.links = data;
  // });

});
