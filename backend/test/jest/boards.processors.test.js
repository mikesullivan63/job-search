const GreenhouseCore = require("../../boards/processors/greenhouse");
const processGreenhouse = GreenhouseCore.processGreenhouse;
const processLever = require("../../boards/processors/lever").processLever;
const processGoogle = require("../../boards/processors/google").processGoogle;
const processBreezy = require("../../boards/processors/breezy").processBreezy;
const processWorkable = require("../../boards/processors/workable")
  .processWorkable;

jest.mock("request-promise-core/configure/request2");

testBoard = (procesor, size, done) => {
  return procesor({ name: "test", url: "example" }, "", "", false).then(
    board => {
      let jobs = board.jobs.map(job =>
        [job.title, job.location, job.url].join("").toLowerCase()
      );
      jobs.forEach(concatenatedString =>
        expect(concatenatedString).toEqual(
          expect.not.stringContaining("undefined")
        )
      );
      expect(jobs.length).toBeGreaterThan(0);
      expect(jobs.length).toBe(size);
      done();
    }
  );
};

describe("Suite of tests to ensure all processors work", () => {
  test("Ensure Greenhouse board works with sample content", done => {
    return testBoard(processGreenhouse, 7, done);
  });

  test("Ensure Lever board works with sample content", done => {
    return testBoard(processLever, 8, done);
  });

  test("Ensure Google board works with sample content", done => {
    return testBoard(processGoogle, 39, done);
  });

  test("Ensure Breezy board works with sample content", done => {
    return testBoard(processBreezy, 4, done);
  });

  //Skipping until re-adding
  xtest("Ensure Workable board works with sample content", done => {
    return testBoard(processWorkable, 1, done);
  });
});
