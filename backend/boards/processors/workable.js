const processBoardPage = require("./core");

/*
<li class="job" id="job_1109478">
    <h2>
        <a href="/j/7A4037BD6C?viewed=true">QA Engineer</a>
    </h2>
    <p class="meta">
        <strong class="telecommute">Remote</strong> · New York, United States
    </p>
</li>
*/

exports.processWorkable = (board, title, location, debug) => {
  return processBoardPage(
    board,
    "https://apply.workable.com/" + board.url,
    title,
    location,

    [
      {
        jobSelector: "li.job-opening",
        titleExtractor: el =>
          el
            .find("h2")
            .text()
            .trim(),
        locationExtractor: (el, $) =>
          el
            .find("span[data-ui=job-location]")
            .text()
            .trim(),
        linkExtractor: el =>
          "https://apply.workable.com" + el.find("h2 a").attr("href")
      }
    ],
    debug
  );
};
