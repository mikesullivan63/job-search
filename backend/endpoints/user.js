const routes = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const auth = require("../config/jwt").auth;
const jwt = require("../config/jwt");

//Common logic
function isValidPassword(password) {
  return (
    /[a-z]/.exec(password) &&
    /[A-Z]/.exec(password) &&
    /[1-9]/.exec(password) &&
    /[$^!%#@&*()\-_]/.exec(password)
  );
}

function findUser(userId) {
  return new Promise(function(resolve, reject) {
    User.findById(userId).exec(function(err, user) {
      if (err) {
        return reject(err);
      } else {
        return resolve(user);
      }
    });
  });
}

function returnUser(req, res, returnExtractor) {
  jwt.protectedRequest(req, res, (req, res) => {
    findUser(req.payload._id)
      .then(user => {
        if (user) {
          res.status(200);
          res.json(returnExtractor(user));
        } else {
          console.log("Error trying to find user for ", req.payload._id);
          res
            .status(500)
            .json({ message: "Error during lookup: no user found" });
        }
      })
      .catch(error => {
        console.log("Error", error);
        res.status(500).json({ message: "Error during lookup: " + error });
      });
  });
}

//Routes
routes.route("/register").post(function(req, res) {
  const { email, firstName, lastName, password, confirm } = req.body;
  let errors = [];

  if (!email || email === "" || email.length === 0) {
    errors.push("Email is required");
  }

  if (!firstName || firstName === "" || firstName.length === 0) {
    errors.push("First Name is required");
  }

  if (!lastName || lastName === "" || lastName.length === 0) {
    errors.push("last Name is required");
  }

  if (confirm !== password) {
    errors.push("Passwords do not match");
  }

  if (password.length < 8 || password.length > 64) {
    errors.push("Passwords must be between 8 and 64 characters");
  }

  if (!isValidPassword(password)) {
    errors.push(
      "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
    );
  }

  User.findOne({ email })
    .exec()
    .then(existingUser => {
      if (errors.length > 0) {
        res.status(500);
        res.json(errors);
      } else {
        if (existingUser) {
          res.status(500).json("Error processing submission");
        } else {
          //No errrors, run the save;
          var user = new User();
          user.email = email;
          user.firstName = firstName;
          user.lastName = lastName;
          user.setPassword(password);

          user.save(function(error) {
            if (error) {
              console.log("Saving user errored: ", error);
              res.status(500);
              res.json("Error processing submission");
            } else {
              var token;
              token = jwt.generateJwt(user);
              res.status(200);
              res.json({ token });
            }
          });
        }
      }
    })
    .catch(error => {
      console.log("Error checking for uniqueness in email", email, error);
      errors.push("Error processing submission");
    });
});

routes.get("/profile", auth, (req, res) => {
  jwt.protectedRequest(req, res, (req, res) => {
    returnUser(req, res, user => {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };
    });
  });
});

routes.post("/updateProfile", auth, (req, res) => {
  jwt.protectedRequest(req, res, (req, res) => {
    const { email, firstName, lastName } = req.body;

    const errors = [];
    if (!email || email === "") {
      errors.push("Email can not be empty");
    }

    if (!email || email === "") {
      errors.push("Email can not be empty");
    }

    if (!firstName || firstName === "") {
      errors.push("First Name can not be empty");
    }
    if (!lastName || lastName === "") {
      errors.push("Last Name can not be empty");
    }

    if (errors.length > 0) {
      res.status(500).json(errors);
      return;
    }

    if (errors.length === 0) {
      User.findOne({ email })
        .exec()
        .then(existingUser => {
          if (existingUser && existingUser._id.toString() !== req.payload._id) {
            console.log(
              "Error updating current user e-mail to another user's email: ",
              email,
              errors
            );
            res.status(500).json("Error setting email to " + email);
            return;
          }
          findUser(req.payload._id)
            .then(user => {
              if (user) {
                user.email = email;
                user.firstName = firstName;
                user.lastName = lastName;

                user.save(function(err, updatedUser) {
                  if (err) {
                    console.log(
                      "Error trying to save user, ",
                      JSON.stringify(user, null, 2),
                      err
                    );
                    res.status(500).json("Error during save");
                  } else {
                    res.status(200);
                    res.json({ email, firstName, lastName });
                  }
                });
              } else {
                console.log("No user found for ", req.payload._id);
                res.status(500).json("Error during save");
              }
            })
            .catch(error => {
              console.log(
                "Error trying to find user for ",
                req.payload._id,
                error
              );
              res.status(500).json("Error processing submission");
            });
        })
        .catch(error => {
          console.log("Existing user lookup resulted in error", error);
          res.status(500).json("Error processing submission");
        });
    }
  });
});

routes.post("/updatePassword", auth, (req, res) => {
  jwt.protectedRequest(req, res, (req, res) => {
    const { oldPassword, password, confirm } = req.body;

    const errors = [];
    if (!oldPassword || oldPassword === "") {
      errors.push("Current Password can not be empty");
    }

    if (!isValidPassword(password)) {
      errors.push(
        "Passwords must contain a lower case letter, an upper case letter, a number and a symbol"
      );
    }

    if (!password || password === "") {
      errors.push("new Password can not be empty");
    }
    if (!confirm || confirm === "") {
      errors.push("Confirm Password can not be empty");
    }
    if (confirm !== password) {
      errors.push("Password and Confirmation must match");
    }

    if (errors.length > 0) {
      res.status(500).json(errors);
      return;
    }

    findUser(req.payload._id)
      .then(user => {
        if (user) {
          if (!user.validPassword(oldPassword)) {
            res.status(500).json("Current Password does not match");
            return;
          }

          user.setPassword(password);
          user.save(function(err, updatedUser) {
            if (err) {
              console.log("Error during save", err);
              res.status(500).json("Error updating your password");
            } else {
              res.status(200);
              res.json("SUCCESS");
            }
          });
        } else {
          console.log("Error trying to find user for ID", req.payload._id);
          res.status(500).json("Error updating your password");
        }
      })
      .catch(error => {
        console.log("Error finding user", error);
        res.status(500).json("Error updating your password");
      });
  });
});

module.exports = routes;
