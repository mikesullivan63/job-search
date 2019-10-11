const Boards = require("../../boards/boards");

Boards.Boards.filter(board => {
  //Leave empty for all
  return true;
  //return board.name === 'Doist'
}).forEach(board => {
  board
    .processor(board, "", "", false)
    .then(result => {
      console.log(
        "Board:",
        result.company,
        "URL:",
        result.url,
        "Jobs:",
        result.jobs.length
      );
      result.jobs.forEach(job => {
        if (
          [job.title, job.location, job.url]
            .join("")
            .toLowerCase()
            .indexOf("undefined") !== -1
        ) {
          console.log("  Error in posting: ", job.titl, job.location, job.url);
        }
      });
    })
    .catch(error => {
      console.log("Error procssing", board.name, error);
    });
});
