const routes = require("express").Router();
const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const UserJobs = mongoose.model("UserJobs");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Utility functions
function processJobModifications(req, res, modification) {
  jwt.protectedRequest(req, res, (req, res) => {
    UserJobs.findOne({ userId: req.payload._id }).exec((err, userJobs) => {
      if (err) {
        res.status(500).json({
          message: "Error during lookup: " + err
        });
      } else {
        modification(req, res, userJobs);
      }
    });
  });
}

function processJobAdditions(req, res, update, returnData) {
  processJobModifications(req, res, (req, res, userJobs) => {
    if (!userJobs) {
      userJobs = new UserJobs();
      userJobs.userId = req.payload._id;
    }

    var job = new Job();
    job.board = req.body.board;
    job.url = req.body.url;
    job.title = req.body.title;
    job.location = req.body.location;

    update(userJobs, job);

    userJobs.save(function(err, updatedUserJobs) {
      if (err) {
        res.status(500).json({
          message: "Error during save: " + err
        });
      } else {
        res.status(200);
        res.json(returnData(updatedUserJobs));
      }
    });
  });
}

//Routes
routes.post("/add-job", auth, function(req, res) {
  processJobAdditions(
    req,
    res,
    (userJobs, job) => (userJobs.active = userJobs.active.slice().concat(job)),
    userJobs => {
      return userJobs.active;
    }
  );
});

routes.post("/ignore-job", auth, function(req, res) {
  processJobAdditions(
    req,
    res,
    (userJobs, job) =>
      (userJobs.ignored = userJobs.ignored.slice().concat(job)),
    userJobs => {
      return userJobs.ignored;
    }
  );
});

routes.post("/archive-job", auth, function(req, res) {
  console.log("Archiving: ", req.body.jobId);
  processJobModifications(req, res, (req, res, userJobs) => {
    let jobToIgnore = userJobs.active.find(
      job => job._id.toString() === req.body.jobId
    );

    console.log("jobToIgnore: ", jobToIgnore);

    if (jobToIgnore) {
      console.log(
        "starting: ",
        userJobs.active.length,
        userJobs.ignored.length
      );

      userJobs.active = userJobs.active.filter(
        job => job._id.toString() !== req.body.jobId
      );
      userJobs.ignored = userJobs.ignored.slice().concat(jobToIgnore);
      userJobs.save(function(err, updatedUserJobs) {
        if (err) {
          res.status(500).json({
            message: "Error during save: " + err
          });
        } else {
          console.log(
            "returning: ",
            updatedUserJobs.active.length,
            updatedUserJobs.ignored.length
          );

          res.status(200);
          res.json({
            active: updatedUserJobs.active,
            ignored: updatedUserJobs.ignored
          });
        }
      });
    } else {
      res.status(500).json({
        message: "Job not found in Active list"
      });
    }
  });
});

module.exports = routes;
