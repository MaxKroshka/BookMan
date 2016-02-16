var User = require('./userModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

// Promisify a few mongoose methods with the `q` promise library
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // check to see if user already exists
    findUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          return createUser({
            username: username,
            password: password
          });
        }
      })
      .then(function (user) {
        res.json(user);
      })
      .fail(function (error) {
        next(error);
      });
  }
};
