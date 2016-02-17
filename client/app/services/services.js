angular.module('bookman.services', [])

  .factory('Lists', function($http) {

    var getLists = function() {
      return $http({
        method: 'GET',
        url: 'api/lists'
      }).then(function(res) {
        return res.data;
      });
    };

    var addList = function(list) {
      return $http({
        method: 'POST',
        url: 'api/lists',
        data: list
      });
    };

    return {
      getLists: getLists,
      addList: addList
    };
  })

  .factory('Links', function($http) {

    var getLinks = function() {
      return $http({
        method: 'GET',
        url: '/api/links'
      }).then(function(res) {
        return res.data;
      });
    };

    var addLink = function(link) {
      return $http({
        method: 'POST',
        url: '/api/links',
        data: link
      });
    };

    var removeLink = function(link) {
      return $http({
        method: 'POST',
        url: '/api/links/remove',
        data: link
      });
    };

    var toggleEvent = function(urlData) {
      return $http({
        method: 'POST',
        url: 'api/links/event',
        data: urlData
      });
    };


    return {
      getLinks: getLinks,
      addLink: addLink,
      removeLink: removeLink,
      toggleEvent: toggleEvent
    };

  })
  
  .factory('Auth', function($http, $location, $window) {

    var signin = function(user) {
      return $http({
          method: 'POST',
          url: '/api/users/signin',
          data: user
        })
        .then(function(resp) {
          return resp.data.token;
        });
    };

    var signup = function(user) {
      return $http({
          method: 'POST',
          url: '/api/users/signup',
          data: user
        })
        .then(function(resp) {
          return resp.data.token;
        });
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem('com.bookman');
    };

    var signout = function() {
      $window.localStorage.removeItem('com.bookman');
      $location.path('/signin');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  });
