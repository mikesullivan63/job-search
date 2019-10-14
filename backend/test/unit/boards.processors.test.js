const Boards = require("../../boards/boards");

xtest("Ensure all boards return values for title, location, and URL", () => {
  return Promise.all(
    Boards.Boards.filter(board => {
      //Leave empty for all
      return true;
      //return board.name === 'Doist'
    }).map(board => board.processor(board, "", "", false))
  )
    .then(result => {
      result
        .flatMap(board => board.jobs)
        .map(job => [job.title, job.location, job.url].join("").toLowerCase())
        .forEach(concatenatedString =>
          expect(concatenatedString).toEqual(
            expect.not.stringContaining("undefined")
          )
        );
    })
    .catch(error => {
      console.log("Error procssing", board.name, error);
    });
}, 10000);
