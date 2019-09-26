const processBoardPage = require('./core')

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

exports.processWorkable = (board, title, location, res) => {
   processBoardPage(board, "https://" +  board.url + ".workable.com/", title, location, 
   'li.job',
   (el) => el.find('h2 a').text(), 
   (el,$) => el.find('p.meta').text() + " " + el.find('p.meta').children().map((i, el) => $(el).text()).get().join(' '), 
   (el) => "https://" +  board.url + ".workable.com" + el.attr('href'),
   res, true);
};