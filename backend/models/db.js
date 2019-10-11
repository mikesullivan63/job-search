var mongoose = require("mongoose");
module.exports.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "DEVELOPMENT_KEY";

const MONGO_PATH = process.env.MONGODB_URI || "mongodb://localhost:27017/job-search"

mongoose.connect(
  MONGO_PATH,
  { useNewUrlParser: true },
  error => {
    if (error) {
      console.log("Error connecting to Mongo Database: " + error);
    } else {
      console.log("Connected to Mongo Database");
    }
  }
);
