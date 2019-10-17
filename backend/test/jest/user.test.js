const supertest = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const request = supertest(app);
require("../../models/user");
const User = mongoose.model("User");
const jwt = require("../../config/jwt");
const sinon = require("sinon");
require("sinon-mongoose");

jest.mock("request-promise-core/configure/request2");

const user = new User();
user.firstName = "example";
user.lastName = "McEexample";
user.email = "example@example.com";

function getAuthToken() {
  return jwt.generateJwt(user);
}

afterEach(done => {
  sinon.restore();
  done();
});

afterAll(done => {
  mongoose.disconnect();
  done();
});

describe("Suite of tests to ensure all user calls work", () => {
  it("Ensure profile requires authentication", done => {
    return request
      .get("/user/profile")
      .expect(401)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure profile errors for system errors", done => {
    sinon
      .mock(User)
      .expects("findById")
      .chain("exec")
      .yields(new Error("DB not working"), null);

    return request
      .get("/user/profile")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(500)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure profile errors for system errors", done => {
    sinon
      .mock(User)
      .expects("findById")
      .chain("exec")
      .yields(null, null);

    return request
      .get("/user/profile")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(500)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure profile call works for system errors", done => {
    sinon
      .mock(User)
      .expects("findById")
      .chain("exec")
      .yields(null, user);

    return request
      .get("/user/profile")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });
});
