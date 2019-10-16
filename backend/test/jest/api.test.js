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

describe("Suite of tests to ensure all API's call work", () => {
  it("Ensure list of boards is working", done => {
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

  it("Ensure job search works", done => {
    return request
      .get("/api/Abstract/en/san%20or%20sf")
      .expect(200)
      .expect(response => {
        if (response.body.company !== "Abstract") {
          throw new Error(
            "Company name did not come back: " + response.body.company
          );
        }
      })
      .expect(response => {
        if (response.body.status !== "COMPLETED") {
          throw new Error("Status is incorrect: " + response.body.status);
        }
      })
      .expect(response => {
        if (response.body.jobs.length === 0) {
          throw new Error("No jobs returned");
        }
      })
      .end((error, response) => {
        if (error) return done(error);
        done();
      });
  });
});
