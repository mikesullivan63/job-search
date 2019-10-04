const routes = require('express').Router();
const passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserQueries = mongoose.model('UserQueries');
var jwt = require('express-jwt');
var auth = require('./user').auth;

module.exports.auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

//Routes
routes.route('/register').post(function(req, res) {
    var user = new User();

    user.email = req.body.email;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
  
    user.setPassword(req.body.password);

    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
});

routes.route('/login').post(function(req, res) {
    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
});

routes.route('/profile', auth).get(function(req, res) {
  protectedRequest(req, res, (req, res) => {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  })
});

routes.route('/search', auth).post(function(req, res) {
  protectedRequest(req, res, (req, res) => {
        UserQueries
        .findOne({userId: req.payload._id})
        .exec((err, userQueries) => {
          if(err) {
            res.status(500).json({
              "message" : "Error during lookup: " + err 
            })
          } else {
            userQueries.queries = userQueries.queries.slice().unshift({
              title: req.body.title, 
              location: req.body.location, 
              time: new Date});

            userQueries.save(function(err) {
              if(err) {
                res.status(500).json({
                  "message" : "Error during save: " + err 
                })
              } else {
                res.status(200);
                res.json("OK");  
              }
            });
          }
        });  
  });
});

routes.route('/last-search', auth).get(function(req, res) {
  protectedRequest(req, res, (req, res) => {
    UserQueries
        .findOne({userId: req.payload._id})
        .exec((err, userQueries) => {
          if(err) {
            res.status(500).json({
              "message" : "Error during lookup: " + err 
            })
          } else {
            if(userQueries.queries.length > 0) {
              res.status(200);
              res.json(userQueries.queries[0]);  
            } else {
              res.status(200);
              res.json({
                title: '', 
                location: '', 
                time: new Date});  
            }
          }
        });  
  });
});

module.exports.protectedRequest = function(req, res, body) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    body(req, res);
  }
}

module.exports = routes