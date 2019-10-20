const routes = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Common logic
function findUser(userId) {
  return new Promise(function(resolve, reject) {
    User.findById(userId).exec(function(err, user) {
      if (err) {
        return reject(err);
      } else {
        return resolve(user);
      }
    });
  });
}

function returnUser(req, res, returnExtractor) {
  jwt.protectedRequest(req, res, (req, res) => {
    findUser(req.payload._id)
      .then(user => {
        if (user) {
          res.status(200);
          res.json(returnExtractor(user));
        } else {
          console.log("Error trying to find user for ", req.payload._id);
          res
            .status(500)
            .json({ message: "Error during lookup: no user found" });
        }
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
}

//Routes
routes.get("/profile", auth, (req, res) => {
  returnUser(req, res, user => {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
  });
});

module.exports = routes;
