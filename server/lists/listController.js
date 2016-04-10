var List = require('./listModel.js');
var Link = require('../links/linkModel.js');
Q = require('q');

var findList = Q.nbind(List.findOne, List);
var createList = Q.nbind(List.create, List);
var findAllLists = Q.nbind(List.find, List);
var removeAllLinks = Q.nbind(Link.remove, Link);


module.exports = {

  allLists: function(req, res, next) {
    var user = req.user.username;
    findAllLists({ user: user })
      .then(function(lists) {
        res.json(lists);
      })
      .fail(function(error) {
        next(error);
      });
  },

  newList: function(req, res, next) {
    var listName = req.body.name;
    var user = req.user.username;
    findList({ name: listName, user: user })
      .then(function(match) {
        if (match) {
          return next(new Error('List already exists.'));
        }
        var newList = {
          name: listName,
          user: user
        };
        return createList(newList);
      })
      .then(function(createdList) {
        if (createdList) {
          res.json(createdList);
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  removeList: function(req, res, next) {
    var listName = req.body.name;
    var user = req.user.username;
    findList({ name: listName, user: user })
      .then(function(list) {
        if (!list) {
          return next(new Error('List cant be removed.'));
        }
        return list.remove();
      })
      .then(function() {
        removeAllLinks({ tab: listName, user: user })
          .then(function() {
            console.log('removed links');
          })
          .catch(function(err) {
            console.log('error:', err);
          });
      })
      .then(function() {
        res.json();
        console.log('removed list');
      })
      .catch(function(err) {
        console.log('error:', err);
      });
  },

};
