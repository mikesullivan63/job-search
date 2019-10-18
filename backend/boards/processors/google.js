const processBoardPage = require("./core");

/*
<li data-positionid="P_AAAAAACAAJZHZE3lvPT2nK" class="bb-public-jobs-list__job-item ptor-jobs-list__item">
    <a href="https://hire.withgoogle.com" target="_blank" class="bb-public-jobs-list__item-link">
        <span class="bb-public-jobs-list__job-item-title ptor-jobs-list__item-job-title">Senior Software Engineer, Build Automation - Ursa Labs</span>
        <span class="bb-public-jobs-list__job-item-location ptor-jobs-list__item-location">USA</span>
    </a>
</li>

OR

<li class="bb-public-jobs-list__job-item ptor-jobs-list__item">
  <a href="https://hire.withgoogle.com"target="_blank" 
    class="bb-public-jobs-list__job-item-title ptor-jobs-list__item-job-title">Engineering Manager</a>
  <div class="bb-public-jobs-list__job-item-location ptor-jobs-list__item-location">North America</div>
</li>
*/

exports.processGoogle = (board, title, location, debug) => {
  return processBoardPage(
    board,
    "https://hire.withgoogle.com/public/jobs/" + board.url,
    title,
    location,
    [
      {
        jobSelector: "a.bb-public-jobs-list__item-link",
        titleExtractor: el =>
          el.find("span.bb-public-jobs-list__job-item-title").text(),
        locationExtractor: el =>
          el.find("span.bb-public-jobs-list__job-item-location").text(),
        linkExtractor: el => el.attr("href")
      },
      {
        jobSelector: "li.bb-public-jobs-list__job-item",
        titleExtractor: el =>
          el.find("a.bb-public-jobs-list__job-item-title").text(),
        locationExtractor: el =>
          el.find("div.bb-public-jobs-list__job-item-location").text(),
        linkExtractor: el =>
          el.find("a.bb-public-jobs-list__job-item-title").attr("href")
      }
    ],
    debug
  );
};
