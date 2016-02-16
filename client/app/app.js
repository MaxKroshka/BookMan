angular.module('bookman', [
    'bookman.services',
    'bookman.links',
    'bookman.lists',
    'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/allLinks', {
        templateUrl: 'app/links/allLinks.html',
        controller: 'LinksController'
      })
      .when('/bookmarks', {
        templateUrl: 'app/links/bookmarks.html',
        controller: 'LinksController'
      })
      .when('/readingList', {
        templateUrl: 'app/links/readingList.html',
        controller: 'LinksController'
      })
      .when('/', {
        templateUrl: 'app/links/links.html',
        controller: 'LinksController'
      });
  })
  .animation('.fade', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      $(element).fadeIn(1000, function() {
        done();
      });
    },
    leave: function(element, done) {
      $(element).fadeOut(1000, function() {
        done();
      });
    },
    move: function(element, done) {
      element.css('display', 'none');
      $(element).slideDown(500, function() {
        done();
      });
    }
  };
})

  .run(function($rootScope, $location) {
    $rootScope.activeTab = 'bookmarks';
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      $rootScope.location = $location.path();
    });
  });
