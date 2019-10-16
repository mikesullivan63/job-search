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
  return jwt.generateJwt(user);
}

function getUserJobsObject(active, ignored) {
  let uj = new UserJobs();
  uj.active = active;
  uj.ignored = ignored;
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
  sinon.restore();
  done();
});

afterAll(done => {
  mongoose.disconnect();
  done();
});

describe("Suite of tests to ensure all List Job calls requore authentication", () => {
  commonUnauthTest = (url, done) => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(new Error("DB not working"), null);

    return request
      .get(url)
      .expect(401)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  };

  commonAuthTest = (url, done) => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(new Error("DB not working"), null);

    return request
      .get(url)
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(500)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  };

  it("Ensure list of active jobs is protected by authentication, failure", done => {
    return commonUnauthTest("/job/active-jobs", done);
  });

  it("Ensure list of active jobs is protected by authentication, success", done => {
    return commonAuthTest("/job/active-jobs", done);
  });

  it("Ensure list of active jobs is protected by authentication, failure", done => {
    return commonUnauthTest("/job/ignored-jobs", done);
  });

  it("Ensure list of active jobs is protected by authentication, success", done => {
    return commonAuthTest("/job/ignored-jobs", done);
  });
});

describe("Suite of tests to ensure all List Job calls work", () => {
  commonTest = (url, uj, expectedSize, done) => {
    sinon
      .mock(UserJobs)
      .expects("findOne")
      .chain("exec")
      .yields(null, uj);

    return request
      .get(url)
      .set({ Authorization: "Bearer " + getAuthToken() })
      .expect(200)
      .expect(response => {
        if (response.body.length !== expectedSize) {
          throw new Error(
            "Found wrong set of boards, should have be " +
              expectedSize +
              " not " +
              response.body.length
          );
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  };

  activeTest = (uj, expectedSize, done) => {
    return commonTest("/job/active-jobs", uj, expectedSize, done);
  };
  ignoredTest = (uj, expectedSize, done) => {
    return commonTest("/job/ignored-jobs", uj, expectedSize, done);
  };

  it("Ensure list of active jobs returns empty list when no object is found", done => {
    return activeTest(null, 0, done);
  });

  it("Ensure list of active jobs returns empty list when object is found, but is empty", done => {
    return activeTest(getEmptyUserJobs(), 0, done);
  });

  it("Ensure list of active jobs returns list when object is found and has entries", done => {
    const uj = getFullUserJobs();
    return activeTest(uj, uj.active.length, done);
  });

  it("Ensure list of ignored jobs returns empty list when no object is found", done => {
    return ignoredTest(null, 0, done);
  });

  it("Ensure list of ignored jobs returns empty list when object is found, but is empty", done => {
    return ignoredTest(getEmptyUserJobs(), 0, done);
  });

  it("Ensure list of ignored jobs returns list when object is found and has entries", done => {
    const uj = getFullUserJobs();
    return ignoredTest(uj, uj.ignored.length, done);
  });
});
