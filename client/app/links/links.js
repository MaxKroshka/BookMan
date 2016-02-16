angular.module('bookman.links', [])

.controller('LinksController', function ($scope, Links) {

  $scope.data = {};
  $scope.data.links = [{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'},{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'},{title: 'Google', description: 'The most popular search engine', url: 'http://google.com'}];

  Links.getLinks().then(function (data) {
    console.log(data);
    $scope.data.links = data;
  });

  $scope.addUrl = function(){
    Links.addLink({url: $scope.newUrl})
      .then(function (res) {
           console.log(res);
        $scope.data.links.push(res.data);
      });
    $scope.newUrl = '';
  };
});
