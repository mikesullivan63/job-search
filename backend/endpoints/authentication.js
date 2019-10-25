const routes = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("../config/jwt");

//Routes
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
      res.json({ token });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

module.exports = routes;
