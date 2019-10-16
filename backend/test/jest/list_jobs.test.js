//https://zellwk.com/blog/endpoint-testing/
const supertest = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const request = supertest(app);
require("../../models/user");
require("../../models/job");
const User = mongoose.model("User");
const UserJobs = mongoose.model("UserJobs");
const jwt = require("../../config/jwt");
const sinon = require("sinon");
require("sinon-mongoose");

jest.mock("request-promise-core/configure/request2");

function getAuthToken() {
  const user = new User();
  user.firstName = "example";
  user.lastName = "McEexample";
  user.email = "example@example.com";
  const token = jwt.generateJwt(user);
  console.log("token", token);
  return token;
}

function getUserJobsObject(active, ignored) {
  let uj = UserJobs();
  uj.active = active;
  uj.ignored = ignored;

  console.log("Returning: " + JSON.stringify(uj, null, 2));
  return uj;
}

function getEmptyUserJobs() {
  return getUserJobsObject(null, null);
}

function getFullUserJobs() {
  const activeList = [];
  const ignoredList = [];

  for (let i = 1; i < 15; i++) {
    activeList.push({
      board: "example",
      url: "https://www.example.com/job/" + 37 * i,
      title: "Job Title #" + 37 * i,
      location: "City, ST"
    });
    ignoredList.push({
      board: "example",
      url: "https://www.example.com/job/" + 73 * i,
      title: "Job Title #" + 73 * i,
      location: "City, ST"
    });
  }
  return getUserJobsObject(activeList, ignoredList);
}

afterEach(done => {
  console.log("Resetting mocks");
  sinon.restore();
  done();
});

afterAll(done => {
  mongoose.disconnect();
  done();
});

describe("Suite of tests to ensure all List Job calls work", () => {
  it("Ensure list of active jobs is protected by authentication, failure", done => {
    return request
      .get("/job/active-jobs")
      .expect(401)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure list of active jobs is protected by authentication, success", done => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(new Error("DB not working"), null);

    return request
      .get("/job/active-jobs")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(500)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure list of active jobs returns empty list when no object is found", done => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(null, null);

    return request
      .get("/job/active-jobs")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect(response => {
        if (response.body.length !== 0) {
          throw new Error(
            "Should have been an empty array, instead was " + response
          );
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure list of active jobs returns empty list when object is found, but is empty", done => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(null, getEmptyUserJobs());

    return request
      .get("/job/active-jobs")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect(response => {
        if (response.body.length !== 0) {
          throw new Error(
            "Should have been an empty array, instead was " + response
          );
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure list of active jobs returns list when object is found and has entries", done => {
    const uj = getFullUserJobs();
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(null, uj);

    return request
      .get("/job/active-jobs")
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect(response => {
        console.log("response:", response);
        if (response.body.length !== uj.active.length) {
          throw new Error(
            "Found wrong set of boards, should have be " +
              uj.active.length +
              " not " +
              response.body.length
          );
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });
  /*
  it("Ensure list of ignored jobs is protected by authentication", done => {});

  it("Ensure list of ignored jobs returns empty list when no object is found", done => {});

  it("Ensure list of ignored jobs returns empty list when object is found, but is empty", done => {});

  it("Ensure list of ignored jobs returns list when object is found and has entries", done => {});
  */
});
