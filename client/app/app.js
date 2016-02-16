angular.module('bookman', [
  'bookman.links',
  'bookman.lists',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
  });
});
