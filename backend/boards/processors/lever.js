const processBoardPage = require("./core");

/*
<div class="posting" data-qa-posting-id="">
    <div class="posting-apply" data-qa="btn-apply">
        <a href="" class="posting-btn-submit template-btn-submit cerulean">Apply</a>
    </div>
    <a class="posting-title" href="">
        <h5 data-qa="posting-name">Core Platform Engineer</h5>
        <div class="posting-categories">
            <span href="#" class="sort-by-location posting-category small-category-label">San Francisco, NY or Remote w/in U.S.</span>
            <span href="#" class="sort-by-team posting-category small-category-label">Engineering</span>
            <span href="#" class="sort-by-commitment posting-category small-category-label">Full-time</span>
        </div>
    </a>
</div>
*/

exports.processLever = (board, title, location, res) => {
  processBoardPage(
    board,
    "https://jobs.lever.co/" + board.url,
    title,
    location,
    "div.posting",
    el => el.find("[data-qa=posting-name]").text(),
    el => el.find("span.sort-by-location").text(),
    el => el.find("a.posting-title").attr("href"),
    res
  );
};
