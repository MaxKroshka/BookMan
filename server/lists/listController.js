var List = require('./listModel.js');
    Q = require('q');

var findList = Q.nbind(List.findOne, List);
var createList = Q.nbind(List.create, List);
var findAllLists = Q.nbind(List.find, List);


module.exports = {

  allLists: function (req, res, next){
    // var user = req.user.username;
    findAllLists({})
      .then(function(lists){
        res.json(lists);
      })
      .fail(function (error){
        next(error);
      });
  },

  newList: function (req, res, next){
    var listName = req.body.name;
    // var user = req.user.username;

    findList({name: listName})
      .then(function(match){
        if(match){
          return next(new Error('List already exists.'));
        }
        var newList = {
          name: listName
        };
        return createList(newList);
      })
      .then(function(createdList){
        if(createdList){
          res.json(createdList);
        }
      })
      .fail(function(error){
        next(error);
      });
  }
};