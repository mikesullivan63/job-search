const GreenhouseCore = require("../../boards/processors/greenhouse");
const processGreenhouse = GreenhouseCore.processGreenhouse;
const processLever = require("../../boards/processors/lever").processLever;
const processGoogle = require("../../boards/processors/google").processGoogle;
const processBreezy = require("../../boards/processors/breezy").processBreezy;
const processWorkable = require("../../boards/processors/workable")
  .processWorkable;

jest.mock("request-promise-core/configure/request2");

testBoard = (procesor, size) => {
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
    }
  );
};

describe("Suite of tests to ensure all processors work", () => {
  test("Ensure Greenhouse board works with sample content", () => {
    return testBoard(processGreenhouse, 7);
  });

  test("Ensure Lever board works with sample content", () => {
    return testBoard(processLever, 8);
  });

  test("Ensure Google board works with sample content", () => {
    return testBoard(processGoogle, 10);
  });

  test("Ensure Breezy board works with sample content", () => {
    return testBoard(processBreezy, 4);
  });

  test("Ensure Workable board works with sample content", () => {
    return testBoard(processWorkable, 1);
  });
});
