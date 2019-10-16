const mongoose = require("mongoose");
const user = require("../../models/user");
const User = mongoose.model("User");

testUserModel = (user, property, done) => {
  user.validate(function(err) {
    if (property !== null) {
      expect(err.errors).toHaveProperty(property);
    } else {
      expect(err).toBeNull();
    }
    done();
  });
};

describe("Suite of tests to Mongoose models work", () => {
  it("Ensure user fails when empty", done => {
    let user = new User();
    testUserModel(user, "lastName", done);
  });
  it("Ensure user fails when only last name is found", done => {
    let user = new User();
    user.lastName = "McEexample";
    testUserModel(user, "firstName", done);
  });
  it("Ensure user fails when only email is not found", done => {
    let user = new User();
    user.lastName = "McEexample";
    user.firstName = "example";
    testUserModel(user, "email", done);
  });
  it("Ensure user fails when only email is not found", done => {
    let user = new User();
    user.lastName = "McEexample";
    user.firstName = "example";
    user.email = "example@example.com";

    testUserModel(user, null, done);
  });
});
