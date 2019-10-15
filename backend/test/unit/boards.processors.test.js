const processGreenhouse = require("../../boards/processors/greenhouse")
  .processGreenhouse;

const processLever = require("../../boards/processors/lever").processLever;

jest.mock("request-promise-core/configure/request2");

describe("Suite of tests to ensure all processors work", () => {
  test("Ensure Greenhouse board works with sample content", () => {
    return processGreenhouse(
      { name: "test", url: "example" },
      "",
      "",
      false
    ).then(board =>
      board.jobs
        .map(job => [job.title, job.location, job.url].join("").toLowerCase())
        .forEach(concatenatedString =>
          expect(concatenatedString).toEqual(
            expect.not.stringContaining("undefined")
          )
        )
    );
  });

  test("Ensure Lever board works with sample content", () => {
    return processLever({ name: "test", url: "example" }, "", "", false).then(
      board =>
        board.jobs
          .map(job => [job.title, job.location, job.url].join("").toLowerCase())
          .forEach(concatenatedString =>
            expect(concatenatedString).toEqual(
              expect.not.stringContaining("undefined")
            )
          )
    );
  });
});
