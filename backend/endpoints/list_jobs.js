const routes = require("express").Router();
const request = require("request-promise-native");
const mongoose = require("mongoose");
const UserJobs = mongoose.model("UserJobs");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");
const commonFunctions = require("./common");

//Routes
routes.get("/active-jobs", auth, (req, res) => {
  commonFunctions.processUserObjects(
    req,
    res,
    UserJobs,
    { userId: req.payload._id },
    (req, res, userJobs) => {
      res.status(200);
      res.json(userJobs ? userJobs.active || [] : []);
    }
  );
});

routes.get("/ignored-jobs", auth, (req, res) => {
  commonFunctions.processUserObjects(
    req,
    res,
    UserJobs,
    { userId: req.payload._id },
    (req, res, userJobs) => {
      res.status(200);
      res.json(userJobs ? userJobs.ignored || [] : []);
    }
  );
});

function processURLLookupAndReturn(res, job) {
  request
    .get({ uri: job.url, resolveWithFullResponse: true, simple: false })
    .then(response => {
      const status =
        response.statusCode == 200
          ? "Active"
          : "INACTIVE (" +
            response.statusCode +
            ": " +
            response.statusText +
            ")";

      res.status(200);
      res.json({ ...job._doc, ...{ status: status } });
    })
    .catch(error => {
      res.status(200);
      res.json({ ...job._doc, ...{ status: "ERROR - " + error } });
    });
}

function getStatusOfJob(req, res, listSelector) {
  jwt.protectedRequest(req, res, (req, res) => {
    commonFunctions
      .findOneObject(UserJobs, { userId: req.payload._id })
      .then(userJobs => {
        const jobs = listSelector(userJobs);
        const job = jobs.find(job => job._id.toString() === req.params.jobId);
        if (!job) {
          res.status(500).json({ message: "Job not found" });
          return;
        }
        processURLLookupAndReturn(res, job);
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
}
routes.get("/active-job-status/:jobId", auth, (req, res) => {
  getStatusOfJob(req, res, userJobs => (userJobs ? userJobs.active || [] : []));
});

routes.get("/ignored-job-status/:jobId", auth, (req, res) => {
  getStatusOfJob(req, res, userJobs =>
    userJobs ? userJobs.ignored || [] : []
  );
});

module.exports = routes;
