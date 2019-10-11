//Pulled largely from https://www.sitepoint.com/user-authentication-mean-stack/
const mongoose = require("mongoose");

var jobSchema = new mongoose.Schema({
  board: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

var userJobsSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  active: [jobSchema],
  ignored: [jobSchema],
  history: [jobSchema]
});

mongoose.model("Job", jobSchema);
mongoose.model("UserJobs", userJobsSchema);
