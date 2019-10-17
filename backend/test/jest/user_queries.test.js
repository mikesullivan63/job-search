const supertest = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const request = supertest(app);
require("../../models/user");
require("../../models/query");
const User = mongoose.model("User");
const UserQueries = mongoose.model("UserQueries");
const jwt = require("../../config/jwt");
const sinon = require("sinon");
require("sinon-mongoose");

jest.mock("request-promise-core/configure/request2");

function getAuthToken() {
  const user = new User();
  user.firstName = "example";
  user.lastName = "McEexample";
  user.email = "example@example.com";
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

describe("Suite of tests to ensure all user query calls work", () => {
  const userQueries = new UserQueries({
    userId: "NOT IMPORTANT",
    queries: [
      { title: "First search", location: "Home", time: new Date() },
      { title: "Second search", location: "Remote", time: new Date() }
    ]
  });

  it("Ensure last search is working", done => {
    sinon
      .mock(UserQueries)
      .expects("findOne")
      .chain("exec")
      .yields(null, userQueries);

    return request
      .get("/user/last-search")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect(response => {
        if (response.body.title !== "Second search") {
          throw new Error(
            "Found wrong last search " +
              JSON.stringify(userQueries[userQueries.length - 1], null, 2) +
              " not " +
              JSON.stringify(response.body, null, 2)
          );
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure search post is working", done => {
    sinon
      .mock(UserQueries)
      .expects("findOne")
      .chain("exec")
      .yields(null, userQueries);

    sinon
      .mock(userQueries)
      .expects("save")
      .yields(null, userQueries);

    return request
      .post("/user/search")
      .send({ title: "New title", location: "New location" })
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect('"OK"')
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });
});
