const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

//DB related setup
require("./models/db");
require("./models/job");
require("./models/query");
require("./models/user");
require("./config/passport");
app.use(passport.initialize());

//API Access control
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.options("*", cors());

//Routes
app.use("/api", require("./endpoints/api"));
app.use("/user", require("./endpoints/user"));
app.use("/job", require("./endpoints/list_jobs"));
app.use("/job", require("./endpoints/modify_jobs"));

//React Front-end routes
app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

//Global Errors
// Catch unauthorised errors
app.use(function(err, req, res, next) {
  console.log("Error function: ", err, JSON.stringify(req.headers));
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  } else if (err) {
    res.status(500);
    res.json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
