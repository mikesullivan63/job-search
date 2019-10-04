const routes = require('express').Router();
const passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserQueries = mongoose.model('UserQueries');
var jwt = require('express-jwt');

var auth = jwt({
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
  console.log("Processing search");
  console.log("auth: " + auth);
  console.log("req.payload " + req.payload);

  protectedRequest(req, res, (req, res) => {
    console.log("Looking up request");

      UserQueries
        .findOne({userId: req.payload._id})
        .exec((err, userQueries) => {
          console.log("Found: " + JSON.stringify(userQueries));

          if(err) {
            res.status(500).json({
              "message" : "Error during lookup: " + err 
            })
          } else {
            if(!userQueries) {
              userQueries = new UserQueries();
            }

            userQueries.queries = userQueries.queries.slice().unshift({
              title: req.body.title, 
              location: req.body.location, 
              time: new Date});

            console.log("Saving: " + JSON.stringify(userQueries));

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

function protectedRequest(req, res, body) {
  // If no user ID exists in the JWT return a 401
  console.log("req " + req);
  //console.log("req string" + JSON.stringify(req));
  console.log("req headers" + JSON.stringify(req.headers));
  console.log("req body" + JSON.stringify(req.body));
  console.log("req.user " + req.user);
  console.log("req.payload " + req.payload);

  //console.log("body " + body);
  
  //console.log("req.payload " + JSON.stringify(req.payload));

  //console.log("Is logged in? " + req.payload._id);
  if (req && ( !req.payload || !req.payload._id)) {
    console.log("Is returning 401");
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    console.log("Proceeding");
    // Otherwise continue
    body(req, res);
  }

  console.log("Done with protectedRequest ");
}

module.exports.protectedRequest = protectedRequest
module.exports.auth = auth

module.exports = routes