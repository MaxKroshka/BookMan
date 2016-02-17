angular.module('bookman', [
    'bookman.services',
    'bookman.links',
    'bookman.lists',
    'bookman.auth',
    'ngRoute'
  ])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'app/auth/signin.html',
        controller: 'AuthController',
        access: {restricted: false}
      })
      .when('/signup', {
        templateUrl: 'app/auth/signup.html',
        controller: 'AuthController',
        access: {restricted: false}
      })
      .when('/allLinks', {
        templateUrl: 'app/links/allLinks.html',
        controller: 'LinksController',
        access: {restricted: true}
      })
      .when('/bookmarks', {
        templateUrl: 'app/links/bookmarks.html',
        controller: 'LinksController',
        access: {restricted: true},
         resolve: {
          updateLists: function ($rootScope) {
            $rootScope.flag = Math.random();
          }
        }
      })
      .when('/readingList', {
        templateUrl: 'app/links/readingList.html',
        controller: 'LinksController',
        access: {restricted: true}
      })
      .when('/signout', {
        resolve: {
          signout: function (Auth) {
            return Auth.signout();
          }
        }
      })
      .when('/', {
        templateUrl: 'app/links/links.html',
        controller: 'LinksController',
        access: {restricted: true}
      })
      .otherwise({
        templateUrl: 'app/links/bookmarks.html',
        controller: 'LinksController',
        access: {restricted: true}
      });
  $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.bookman');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function($rootScope, $location, Auth) {
    $rootScope.activeTab = 'bookmarks';
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      $rootScope.location = $location.path();
      if (next.access.restricted && !Auth.isAuth()) {
        $location.path('/signin');
      }
    });
  });