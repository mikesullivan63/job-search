const request = require("request-promise-native");
const cheerio = require("cheerio");

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

function objectComparator(fields) {
  return (left, right) => {
    for (let field of fields) {
      if (left[field] > right[field]) {
        return 1;
      }
      if (left[field] < right[field]) {
        return -1;
      }
    }
    return 0;
  };
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
        }

        let jobs = [];
        $(jobSelector)
          .each((i, el) => {
            if (debug) {
              console.log("el: " + el);
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
              .sort(objectComparator(["title", "url"]));
          });
        if (debug) {
          console.log("Done parsing: " + jobs.length);
        }

        resolve({ company: board.name, url, jobs });
      })
      .catch(error => {
        console.log("Error loading board: " + board.name + " - " + error);
        reject(error.message);
      });
  });
};
