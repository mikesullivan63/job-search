const routes = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("../config/jwt");

function isValidPassword(password) {
  return (
    /[a-z]/.exec(password) &&
    /[A-Z]/.exec(password) &&
    /[1-9]/.exec(password) &&
    /[$^!%#@&*()\-_]/.exec(password)
  );
}

//Routes
routes.route("/register").post(function(req, res) {
  var user = new User();
  user.email = req.body.email;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.setPassword(req.body.password);

  let errors = [];

  if (!email || email === "" || email.length === 0) {
    errors.push("Email is required");
  }

  if (!firstName || firstName === "" || firstName.length === 0) {
    errors.push("First Name is required");
  }

  if (!lastName || lastName === "" || lastName.length === 0) {
    errors.push("last Name is required");
  }

  if (req.body.confirm !== req.body.password) {
    errors.push("Passwords do not match");
  }

  if (req.body.password.length < 8 || req.body.password.length > 64) {
    errors.push("Passwords must be between 8 and 64 characters");
  }

  if (!isValidPassword(req.body.password)) {
    errors.push(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );
  }

  if (errors.length > 0) {
    res.status(500);
    res.json(errors);
  } else {
    //No errrors, runt he save;
    user.save(function(err) {
      if (err) {
        res.status(500);
        res.json(err);
      }

      var token;
      token = jwt.generateJwt(user);
      res.status(200);
      res.json({ token });
    });
  }
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
      res.json({ token });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

module.exports = routes;
