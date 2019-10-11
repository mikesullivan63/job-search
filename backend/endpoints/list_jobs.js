const routes = require("express").Router();
const mongoose = require("mongoose");
const UserJobs = mongoose.model("UserJobs");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

routes.get("/active-jobs", auth, (req, res) => {
  returnListFromUserJobs(req, res, userJobs => {
    return userJobs ? userJobs.active || [] : [];
  });
});

routes.get("/ignored-jobs", auth, (req, res) => {
  returnListFromUserJobs(req, res, userJobs => {
    return userJobs ? userJobs.ignored || [] : [];
  });
});

function returnListFromUserJobs(req, res, listExtractor) {
  jwt.protectedRequest(req, res, (req, res) => {
    findUserJobs(req.payload._id)
      .then(userJobs => {
        res.status(200);
        res.json(listExtractor(userJobs));
      })
      .catch(error => {
        res.status(500).json({ message: "Error during lookup: " + err });
      });
  });
}

function findUserJobs(userId) {
  return new Promise(function(resolve, reject) {
    UserJobs.findOne({ userId: userId }).exec((err, userJobs) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(userJobs);
      }
    });
  });
}

module.exports = routes;
