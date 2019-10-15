const fs = require("fs");
const cheerio = require("cheerio");

const determineSource = url => {
  if (url.indexOf("greenhouse") > -1) {
    return "greenhouse";
  } else if (url.indexOf("lever") > -1) {
    return "lever";
  } else if (url.indexOf("hire.withgoogle") > -1) {
    return "google";
  } else if (url.indexOf("breezy") > -1) {
    return "breezy";
  } else if (url.indexOf("workable") > -1) {
    return "workable";
  }

  throw new Error("Invalid URL: " + url);
};

const request = {
  get(options) {
    return new Promise((resolve, reject) => {
      let source = determineSource(options.uri);
      fs.readFile(
        "./test/unit/__mocks__/data/" + source + ".html",
        "utf8",
        (err, data) => {
          if (err) reject(err);
          resolve(cheerio.load(data));
        }
      );
    });
  }
};

module.exports = request;
