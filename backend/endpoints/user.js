const routes = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Query = mongoose.model("Query");
const UserQueries = mongoose.model("UserQueries");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Routes
routes.route("/register").post(function(req, res) {
  var user = new User();

  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = jwt.generateJwt(user);
    res.status(200);
    res.json({
      token: token
    });
  });
});

routes.route("/login").post(function(req, res) {
  passport.authenticate("local", function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = jwt.generateJwt(user);
      res.status(200);
      res.json({
        token: token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

routes.route("/profile", auth).get(function(req, res) {
  protectedRequest(req, res, (req, res) => {
    User.findById(req.payload._id).exec(function(err, user) {
      res.status(200).json(user);
    });
  });
});

routes.post("/search", auth, function(req, res) {
  protectedRequest(req, res, (req, res) => {
    UserQueries.findOne({ userId: req.payload._id }).exec(
      (err, userQueries) => {
        if (err) {
          res.status(500).json({
            message: "Error during lookup: " + err
          });
        } else {
          if (!userQueries) {
            userQueries = new UserQueries();
            userQueries.userId = req.payload._id;
          }

          query = new Query();
          query.title = req.body.title;
          query.location = req.body.location;
          query.time = new Date();

          if (userQueries.queries.length > 0) {
            var temp = userQueries.queries.slice();
            temp.push(query);
            userQueries.queries = temp;
          } else {
            userQueries.queries = [query];
          }

          userQueries.save(function(err) {
            if (err) {
              res.status(500).json({
                message: "Error during save: " + err
              });
            } else {
              res.status(200);
              res.json("OK");
            }
          });
        }
      }
    );
  });
});

routes.get("/last-search", auth, function(req, res) {
  protectedRequest(req, res, (req, res) => {
    UserQueries.findOne({ userId: req.payload._id }).exec(
      (err, userQueries) => {
        if (err) {
          res.status(500).json({
            message: "Error during lookup: " + err
          });
        } else {
          if (userQueries && userQueries.queries && userQueries.queries.length > 0) {
            res.status(200);
            res.json(userQueries.queries[userQueries.queries.length - 1]);
          } else {
            res.status(200);
            res.json({
              title: "",
              location: "",
              time: new Date()
            });
          }
        }
      }
    );
  });
});

function protectedRequest(req, res, body) {
  if (req && (!req.payload || !req.payload._id)) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    body(req, res);
  }
}

module.exports = routes;
