const routes = require("express").Router();
const request = require("request-promise-native");
const mongoose = require("mongoose");
const UserJobs = mongoose.model("UserJobs");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Utility functions
function findUserJobs(userId) {
  return new Promise(function(resolve, reject) {
    UserJobs.findOne({ userId }).exec((err, userJobs) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(userJobs);
      }
    });
  });
}

function returnListFromUserJobs(req, res, listExtractor) {
  jwt.protectedRequest(req, res, (req, res) => {
    findUserJobs(req.payload._id)
      .then(userJobs => {
        res.status(200);
        res.json(listExtractor(userJobs));
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
}

//Routes
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

routes.get("/active-job-status/:jobId", auth, (req, res) => {
  jwt.protectedRequest(req, res, (req, res) => {
    findUserJobs(req.payload._id)
      .then(userJobs => {
        const activeJobs = userJobs ? userJobs.active || [] : [];
        const job = activeJobs.find(
          job => job._id.toString() === req.params.jobId
        );
        if (!job) {
          res.status(500).json({ message: "Job not found" });
          return;
        }

        request
          .get({ uri: job.url })
          .then(response => {
            console.log(
              "Response  for ",
              job.board,
              job.title,
              JSON.stringify(response.status, null, 2)
            );

            if (response.status == 200) {
              console.log(
                "Setting status for ",
                job.board,
                job.title,
                "to ACTIVE"
              );
              job.status = "ACTIVE";
            } else {
              console.log(
                "Setting status for ",
                job.board,
                job.title,
                "to INACTIVE"
              );
              job.status = "INACTIVE - " + response.statusText;
            }
            res.status(200);
            res.json(job);
          })
          .catch(error => {
            console.log(
              "Setting status for ",
              job.board,
              job.title,
              "to ERROR"
            );
            job.status = "ERROR - " + error;
            res.status(200);
            res.json(job);
          });
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
});

module.exports = routes;
