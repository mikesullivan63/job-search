const Boards = require("../../boards/boards");

Boards.Boards.forEach(board => {
    let result = board.processor(board, "", "", true);

    if(result) {
        console.log("Board:", result.company, "URL:", result.url );
        result.jobs.forEach((job) => {
            console.log("       " + job.title + " - " + job.location + " - " + job.url );
        })    
    } else {
        console.log("Error procssing", board.name  );
    }
});
