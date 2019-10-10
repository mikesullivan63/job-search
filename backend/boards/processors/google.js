const processBoardPage = require("./core");

/*
<li data-positionid="P_AAAAAACAAJZHZE3lvPT2nK" class="bb-public-jobs-list__job-item ptor-jobs-list__item">
    <a href="https://hire.withgoogle.com" target="_blank" class="bb-public-jobs-list__item-link">
        <span class="bb-public-jobs-list__job-item-title ptor-jobs-list__item-job-title">Senior Software Engineer, Build Automation - Ursa Labs</span>
        <span class="bb-public-jobs-list__job-item-location ptor-jobs-list__item-location">USA</span>
    </a>
</li>
*/

exports.processGoogle = (board, title, location, debug) => {
  processBoardPage(
    board,
    "https://hire.withgoogle.com/public/jobs/" + board.url,
    title,
    location,
    "a.bb-public-jobs-list__item-link",
    el => el.find("span.bb-public-jobs-list__job-item-title").text(),
    el => el.find("span.bb-public-jobs-list__job-item-location").text(),
    el => el.attr("href"), 
    debug
  );
};
