const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "DEVELOPMENT_KEY";

module.exports.auth = expressJwt({
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
      firstName: user.firstName,
      lastName: user.lastName,
      exp: parseInt(expiry.getTime() / 1000, 10)
    },
    ENCRYPTION_KEY
  );
};

module.exports.protectedRequest = function(req, res, body) {
  console.log("Auth check: ", JSON.stringify(req.payload, null, 2));

  if (req && (!req.payload || !req.payload._id)) {
    res.status(401).json({
      message: "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    body(req, res);
  }
};
