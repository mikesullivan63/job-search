const processBoardPage = require("./core");

/*
<li class="position transition">
    <a href="/p/1e0254b886db-business-development-representative">
        <button class="button apply polygot button-right bzyButtonColor">Apply</button>
        <h2>Business Development Representative</h2>
        <ul class="meta">
            <li class="location">
                <i class="fa fa-map-marker"></i>
                <span>Canada</span>
                <span class="spacer"> - </span>
                <i class="fa fa-wifi"></i>
                <span class="polygot">Remote OK</span>
            </li>
            <li class="type">
                <i class="fa fa-building"></i>
                <span class="polygot">Full-Time</span>
            </li>
            <li class="department">
                <i class="fa fa-building"></i>
                <span>Sales</span>
            </li>
        </ul>
        <button class="button apply polygot button-full bzyButtonColor">Apply</button>
    </a>
</li>
*/

exports.processBreezy = (board, title, location, debug) => {
  return processBoardPage(
    board,
    "https://" + board.url + ".breezy.hr/",
    title,
    location,
    [
      {
        jobSelector: "li.position.transition a",
        titleExtractor: el => el.find("h2").text(),
        locationExtractor: (el, $) =>
          el
            .find("li")
            .map((i, el) => $(el).text())
            .get()
            .join(" "),
        linkExtractor: el =>
          "https://" + board.url + ".breezy.hr" + el.attr("href")
      }
    ],
    debug
  );
};
