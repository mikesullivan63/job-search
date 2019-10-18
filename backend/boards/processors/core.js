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

module.exports = (board, url, title, location, selectors, debug) => {
  return new Promise(function(resolve, reject) {
    request
      .get({
        uri: url,
        transform(body) {
          return cheerio.load(body);
        }
      })
      .then($ => {
        console.log("selectors: " + JSON.stringify(selectors, null, 2));
        const jobs = selectors.flatMap(selector => {
          if (debug) {
            console.log("jobSelector: " + JSON.stringify(selector, null, 2));
            console.log("$(jobSelector): " + $(selector.jobSelector).length);
            if ($(selector.jobSelector).length === 0) {
              console.log(
                "jobSelector",
                selector.jobSelector + " didn't match anything in Body",
                $.html("body")
              );
            }
          }

          const cheerioResults = $(selector.jobSelector)
            .filter((i, el) => {
              if (debug) {
                console.log("el: " + $(el).html());
                console.log("title: " + selector.titleExtractor($(el)));
                console.log("loc: " + selector.locationExtractor($(el), $));
                console.log("link: " + selector.linkExtractor($(el), $));
              }
              return match(title, selector.titleExtractor($(el), $));
            })
            .filter((i, el) =>
              match(location, selector.locationExtractor($(el), $))
            )
            .map((i, el) => {
              return {
                title: selector.titleExtractor($(el), $),
                location: selector.locationExtractor($(el), $),
                url: selector.linkExtractor($(el), $)
              };
            });

          //Needed to convert from Cheerio Object to array of results
          const results = [];
          for (let i = 0; i < cheerioResults.length; i++) {
            results.push(cheerioResults[i]);
          }

          return results;
        });

        if (debug) {
          console.log("Done parsing: " + jobs.length);
        }

        jobs.sort(objectComparator(["title", "location", "url"]));
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
