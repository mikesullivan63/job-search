//https://zellwk.com/blog/endpoint-testing/

const supertest = require("supertest");
const app = require("../../server");
const request = supertest(app);

jest.mock("request-promise-core/configure/request2");

describe("Suite of tests to ensure all API's call work", () => {
  it("Ensure list of boards is working", done => {
    //    try {
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
    /*
        
    } catch (error) {
      done(error);
    }
        */
    done();
  });
});
