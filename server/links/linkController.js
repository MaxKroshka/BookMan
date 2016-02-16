var Link = require('./linkModel.js');
    Q = require('q');
    util = require('../config/utils.js');

// Promisify a few mongoose methods with the `q` promise library
var findLink = Q.nbind(Link.findOne, Link);
var createLink = Q.nbind(Link.create, Link);
var findAllLinks = Q.nbind(Link.find, Link);

module.exports = {

  allLinks: function (req, res, next) {
  // var user = req.user.username;
  findAllLinks({})
    .then(function (links) {
      res.json(links);
    })
    .fail(function (error) {
      next(error);
    });
  },

  newLink: function (req, res, next) {
    var url = req.body.url;
    // var user = req.user.username;
    if (!util.isValidUrl(url)) {
      return next(new Error('Not a valid url'));
    }

    findLink({url: url})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          console.log(url);
          return util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            title: title,
            // user: user,
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

  // toggleFav: function(req, res, next){
  // }
};
