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
    console.log("Posting request to", url);
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
              console.log(
                'selector "',
                selector.jobSelector,
                '" results in ',
                $(selector.jobSelector).length,
                "matches"
              );

              if (
                $(selector.jobSelector).length === 0 &&
                selector.jobSelector.indexOf(" ") > -1
              ) {
                let tempSelector = selector.jobSelector;
                while (tempSelector.indexOf(" ") > -1) {
                  tempSelector = tempSelector.substring(
                    0,
                    tempSelector.lastIndexOf(" ")
                  );
                  console.log(
                    '\tselector "',
                    tempSelector,
                    '" results in ',
                    $(tempSelector).length,
                    "matches with markup",
                    $(tempSelector).html()
                  );
                }
              }
            }

            //Locate all jobs for a given selector
            //This map is non-standard - from doc:
            //  "If an array is returned, the elements inside the array are inserted into the set.
            //  If the function returns null or undefined, no element will be inserted."

            if (debug) {
            }
            const cheerioResults = $(selector.jobSelector).map((index, el) => {
              //Map to result format
              const result = {
                title: selector.titleExtractor($(el), $),
                location: selector.locationExtractor($(el), $),
                url: selector.linkExtractor($(el), $)
              };

              //Found some data orth exploring details
              if (!!result.title || !!result.title) {
                if (!result.title || result.title === "") {
                  console.log(
                    "Title is missing from job: ",
                    JSON.stringify(result, null, 2),
                    "markup",
                    $(el).html(),
                    "selector",
                    selector.jobSelector
                  );
                } else if (!result.location || result.location === "") {
                  console.log(
                    "Location is missing from job: ",
                    JSON.stringify(result, null, 2),
                    "markup",
                    $(el).html(),
                    "selector",
                    selector.jobSelector
                  );
                } else if (!result.url || result.url === "") {
                  console.log(
                    "URL is missing from job: ",
                    JSON.stringify(result, null, 2),
                    "markup",
                    $(el).html(),
                    "selector",
                    selector.jobSelector
                  );
                }

                return result;
              }
              return null;
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

        if (jobLists[0].length === 0 && jobLists[1].length === 0 && debug) {
          console.log("No jobs found for markup: ", $.html("body"));
        }

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
