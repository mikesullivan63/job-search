const fs = require("fs");
const cheerio = require("cheerio");

const determineSource = url => {
  if (url.indexOf("greenhouse")) {
    return "greenhouse";
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
