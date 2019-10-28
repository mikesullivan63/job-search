const jwt = require("../config/jwt");

exports.findOneObject = function(model, query) {
  return new Promise(function(resolve, reject) {
    model.findOne(query).exec((err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

exports.processUserObjects = function(req, res, model, query, callback) {
  jwt.protectedRequest(req, res, (req, res) => {
    this.findOneObject(model, query)
      .then(result => {
        callback(req, res, result);
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
};
