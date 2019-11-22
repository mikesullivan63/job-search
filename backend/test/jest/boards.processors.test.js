const GreenhouseCore = require("../../boards/processors/greenhouse");
const processGreenhouse = GreenhouseCore.processGreenhouse;
const processLever = require("../../boards/processors/lever").processLever;
const processGoogle = require("../../boards/processors/google").processGoogle;
const processBreezy = require("../../boards/processors/breezy").processBreezy;
const processWorkable = require("../../boards/processors/workable")
  .processWorkable;

jest.mock("request-promise-core/configure/request2");

testBoard = (procesor, size, otherSize, done) => {
  return procesor({ name: "test", url: "example" }, "Engineer", "", false).then(
    board => {
      let jobs = board.jobs.map(job =>
        [job.title, job.location, job.url].join("").toLowerCase()
      );
      jobs.forEach(concatenatedString => {
        expect(concatenatedString).toEqual(
          expect.not.stringContaining("undefined")
        );
        expect(concatenatedString).toEqual(expect.stringContaining("engineer"));
      });
      let otherJobs = board.otherJobs.map(job =>
        [job.title, job.location, job.url].join("").toLowerCase()
      );
      otherJobs.forEach(concatenatedString => {
        expect(concatenatedString).toEqual(
          expect.not.stringContaining("undefined")
        );
        expect(concatenatedString).toEqual(
          expect.not.stringContaining("engineer")
        );
      });

      expect(jobs.length).toBe(size);
      expect(otherJobs.length).toBe(otherSize);
      done();
    }
  );
};

describe("Suite of tests to ensure all processors work", () => {
  test("Ensure Greenhouse board works with sample content", done => {
    return testBoard(processGreenhouse, 5, 2, done);
  });

  test("Ensure Lever board works with sample content", done => {
    return testBoard(processLever, 3, 5, done);
  });

  test("Ensure Google board works with sample content", done => {
    return testBoard(processGoogle, 7, 22, done);
  });

  test("Ensure Breezy board works with sample content", done => {
    return testBoard(processBreezy, 0, 4, done);
  });

  //Skipping until re-adding
  xtest("Ensure Workable board works with sample content", done => {
    return testBoard(processWorkable, 1, 0, done);
  });
});
