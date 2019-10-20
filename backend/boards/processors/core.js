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
        //Process all selector objects and combine results
        const jobLists = selectors
          .map(selector => {
            //Debug section - skip for actual logic
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

            //Locate all jobs for a given selector
            const cheerioResults = $(selector.jobSelector).map((i, el) => {
              if (debug) {
                console.log("el: " + $(el).html());
                console.log("title: " + selector.titleExtractor($(el)));
                console.log("loc: " + selector.locationExtractor($(el), $));
                console.log("link: " + selector.linkExtractor($(el), $));
              }

              //Map to result format
              return {
                title: selector.titleExtractor($(el), $),
                location: selector.locationExtractor($(el), $),
                url: selector.linkExtractor($(el), $)
              };
            });

            //Needed to convert from Cheerio Object to array of results
            const convertedResults = [];
            for (let i = 0; i < cheerioResults.length; i++) {
              convertedResults.push(cheerioResults[i]);
            }

            //Split jobs into matches and non-matches, reduce to tupple
            return convertedResults.reduce(
              ([matched, other], elem) => {
                match(title, elem.title) && match(location, elem.location)
                  ? matched.push(elem)
                  : other.push(elem);
                return [matched, other];
              },
              [[], []]
            );
          })
          .reduce(
            //Reduce array of tupples to one tupple
            ([matched, other], elem) => {
              return [matched.concat(elem[0]), other.concat(elem[1])];
            },
            [[], []]
          );

        //Sort resulting list
        jobLists[0].sort(objectComparator(["title", "location", "url"]));
        jobLists[1].sort(objectComparator(["title", "location", "url"]));

        resolve({
          company: board.name,
          url,
          jobs: jobLists[0],
          otherJobs: jobLists[1]
        });
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
