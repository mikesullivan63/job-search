const request = require("request-promise-native");
const cheerio = require("cheerio");
const objectComparator = require("../../util/comparator").objectComparator;

function match(needles, haystack) {
  let lowerStack = haystack.toLowerCase();
  if (needles === "") {
    return true;
  }

  return needles
    .toLowerCase()
    .split(" or ")
    .some(needle => lowerStack.indexOf(needle.trim()) !== -1);
}

module.exports = (
  board,
  url,
  title,
  location,
  jobSelector,
  titleExtractor,
  locationExtractor,
  linkExtractor,
  debug
) => {
  return new Promise(function(resolve, reject) {
    request
      .get({
        uri: url,
        transform(body) {
          return cheerio.load(body);
        }
      })
      .then($ => {
        if (debug) {
          console.log("$(jobSelector): " + $(jobSelector).length);
          if ($(jobSelector).length === 0) {
            console.log("jobSelector", jobSelector);
            console.log("Body", $.html("body"));
          }
        }

        let jobs = [];
        $(jobSelector)
          .each((i, el) => {
            if (debug) {
              console.log("el: " + $(el).html());
              console.log("title: " + titleExtractor($(el)));
              console.log("loc: " + locationExtractor($(el), $));
              console.log("link: " + linkExtractor($(el), $));
            }
          })
          .filter((i, el) => match(title, titleExtractor($(el), $)))
          .filter((i, el) => match(location, locationExtractor($(el), $)))
          .each((i, el) => {
            jobs = jobs
              .concat({
                title: titleExtractor($(el), $),
                location: locationExtractor($(el), $),
                url: linkExtractor($(el), $)
              })
              .sort(objectComparator(["title", "location", "url"]));
          });
        if (debug) {
          console.log("Done parsing: " + jobs.length);
        }

        resolve({ company: board.name, url, jobs });
      })
      .catch(error => {
        console.log(
          "Error loading board: " + board.name + " - " + error,
          error.lineNumber,
          error.stack
        );
        reject(error.message);
      });
  });
};
