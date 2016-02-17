var Link = require('./linkModel.js');
    Q = require('q');
    util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findLink = Q.nbind(Link.findOne, Link);
var createLink = Q.nbind(Link.create, Link);
var findAllLinks = Q.nbind(Link.find, Link);

module.exports = {

  allLinks: function (req, res, next) {
  var user = req.user.username;
  findAllLinks({user: user})
    .then(function (links) {
      res.json(links);
    })
    .fail(function (error) {
      next(error);
    });
  },

  newLink: function (req, res, next) {
    var url = req.body.url;
    var tab = req.body.tab;
    var user = req.user.username;
    if (!util.isValidUrl(url)) {
      return next(new Error('Not a valid url'));
    }

    findLink({url: url, user: user})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            title: title,
            tab: tab,
            user: user,
            favicon: 'http://'+url.split('/')[2]+'/favicon.ico'
          };
          return createLink(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  toggleEvent: function(req, res, next){
    var url = req.body.url;
    var event = req.body.event;
    var user = req.user.username;
    findLink({url: url, user: user})
      .then(function (url){
        url[event] = !url[event];
        return url.save();
      })
      .then(function(url) {
        res.json(url);
      })
      .catch(function(err){
        console.log('error:', err);
      });
  },

  removeLink: function(req, res, next){
    var url = req.body.url;
    var user = req.user.username;
    findLink({url: url, user: user})
      .then(function (url){
        return url.remove();
      })
      .then(function() {
        res.json();
        console.log('removed');
      })
      .catch(function(err){
        console.log('error:', err);
      });
  }

};