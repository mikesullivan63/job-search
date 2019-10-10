const Boards = require("../../boards/boards");

Boards.Boards.forEach(board => {
    let result = board.processor(board, "", "", true)
        .then(result => {
            console.log("Board:", result.company, "URL:", result.url );
            result.jobs.forEach((job) => {
                console.log("       " + job.title + " - " + job.location + " - " + job.url );
            })        
        })
        .catch(error => {
            console.log("Error procssing", board.name, error );
        })
});
