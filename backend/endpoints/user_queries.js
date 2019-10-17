const routes = require("express").Router();
const mongoose = require("mongoose");
const Query = mongoose.model("Query");
const UserQueries = mongoose.model("UserQueries");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Common logic

function findUserQueries(userId) {
  return new Promise(function(resolve, reject) {
    UserQueries.findOne({ userId }).exec(function(err, userQueries) {
      if (err) {
        return reject(err);
      } else {
        return resolve(userQueries);
      }
    });
  });
}

function processUserQueries(req, res, processUserQueries) {
  jwt.protectedRequest(req, res, (req, res) => {
    findUserQueries(req.payload._id)
      .then(userQueries => {
        processUserQueries(req, res, userQueries);
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
}

//Routes
routes.post("/search", auth, function(req, res) {
  processUserQueries(req, res, (req, res, userQueries) => {
    if (!userQueries) {
      userQueries = new UserQueries();
      userQueries.userId = req.payload._id;
    }

    let query = new Query();
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

    userQueries.save(function(err, userQueries) {
      if (err) {
        res.status(500).json({
          message: "Error during save: " + err
        });
      } else {
        res.status(200);
        res.json("OK");
      }
    });
  });
});

routes.get("/last-search", auth, function(req, res) {
  processUserQueries(req, res, (req, res, userQueries) => {
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
  });
});

module.exports = routes;
