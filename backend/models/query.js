
//Pulled largely from https://www.sitepoint.com/user-authentication-mean-stack/
const mongoose = require('mongoose');

var querySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
      type: String,
      required: true
    },
    time: {
        type: String,
        required: true
    }
  });

var userQueriesSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    },
    queries: [querySchema]
  });

  mongoose.model('Query', querySchema);
  mongoose.model('UserQueries', userQueriesSchema);