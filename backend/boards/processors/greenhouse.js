const processBoardPage = require("./core");

const processGreenhouseCore = function(
  board,
  title,
  location,
  url,
  linkurl,
  debug
) {
  return processBoardPage(
    board,
    url,
    title,
    location,
    [
      {
        jobSelector: "div.opening",
        titleExtractor: (el, $) => el.find("a").text(),
        locationExtractor: (el, $) => el.find("span.location").text(),
        linkExtractor: (el, $) => linkurl + el.find("a").attr("href")
      }
    ],
    debug
  );
};

exports.processGreenhouse = (board, title, location, debug) => {
  return processGreenhouseCore(
    board,
    title,
    location,
    "https://boards.greenhouse.io/" + board.url,
    "https://boards.greenhouse.io",
    debug
  );
};
exports.processGreenhouseEmbed = (board, title, location, debug) => {
  return processGreenhouseCore(
    board,
    title,
    location,
    "https://boards.greenhouse.io/embed/job_board?for=" + board.url,
    "",
    debug
  );
};
