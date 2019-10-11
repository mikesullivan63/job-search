const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "DEVELOPMENT_KEY";

module.exports.auth = express_jwt({
  secret: ENCRYPTION_KEY,
  userProperty: "payload"
});

module.exports.generateJwt = function(user) {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    ENCRYPTION_KEY
  );
};
