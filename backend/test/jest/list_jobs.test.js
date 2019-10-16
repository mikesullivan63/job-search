//https://zellwk.com/blog/endpoint-testing/
const supertest = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const request = supertest(app);

jest.mock("request-promise-core/configure/request2");

afterAll(done => {
  mongoose.disconnect();
  done();
});

describe("Suite of tests to ensure all List Job calls work", () => {
  it("Ensure list of active jobs is protected by authentication", done => {
    return request
      .get("/job/active-jobs")
      .expect(401)
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  /*
  it("Ensure list of active jobs returns empty list when no object is found", done => {});

  it("Ensure list of active jobs returns empty list when object is found, but is empty", done => {});

  it("Ensure list of active jobs returns list when object is found and has entries", done => {
    return request
      .get("/api/companies")
      .expect(200)
      .expect(/companies/)
      .expect(response => {
        if (response.body.companies.length === 0) {
          throw new Error("Found wrong set of boards");
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });

  it("Ensure list of ignored jobs is protected by authentication", done => {});

  it("Ensure list of ignored jobs returns empty list when no object is found", done => {});

  it("Ensure list of ignored jobs returns empty list when object is found, but is empty", done => {});

  it("Ensure list of ignored jobs returns list when object is found and has entries", done => {});
  */
});
