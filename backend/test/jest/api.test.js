//https://zellwk.com/blog/endpoint-testing/

const supertest = require("supertest");
const app = require("../../server");
const request = supertest(app);

jest.mock("request-promise-core/configure/request2");

describe("Suite of tests to ensure all API's call work", () => {
  it("Ensure list of boards is working", done => {
    request
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
    request
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
        ///company: board.name, url: board.url, status: "ERROR"
        if (response.body.status !== "COMPLETED") {
          throw new Error("Status is incorrect: " + response.body.status);
        }
      })
      .expect(response => {
        ///company: board.name, url: board.url, status: "ERROR"
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
