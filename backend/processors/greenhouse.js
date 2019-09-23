const processBoardPage = require('./core')

const processGreenhouseCore = function (board, title, location, url, linkurl,res) {
    processBoardPage(board, url, title, location, 
        'div.opening',
        (el) => el.find('a').text(), 
        (el) => el.find('span.location').text(), 
        (el) => linkurl + el.find('a').attr('href'),
        res);
};

exports.processGreenhouse = (board, title, location, res) => {
    processGreenhouseCore(
        board, title, location,
        "https://boards.greenhouse.io/"+board.url,
        "https://boards.greenhouse.io/",
         res);
}
exports.processGreenhouseEmbed = (board, title, location, res) => {
    processGreenhouseCore(board, title, location, 
        "https://boards.greenhouse.io/embed/job_board?for="+board.url,
        "",
        res);
}

