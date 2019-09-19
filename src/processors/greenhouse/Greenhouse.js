import parse from 'html-react-parser';

const GreenhouseRoot = "https://boards.greenhouse.io/"
/*
    <div class="opening" department_id="30531" office_id="45267" data-office-45267="true" data-department-30531="true">
        <a data-mapped="true" href="/invision/jobs/1877125">Lead Software Engineer - Mobile </a>
        <br/>
        <span class="location">Remote</span>
    </div>
*/
const processGreenhouse = (board, title, location, caller) => {

    alert('Fetching: ' + GreenhouseRoot + board.url);

    fetch(GreenhouseRoot + board.url)
      .then(res => res.text)
      .then(html => {
          alert('Found HTML: ' + html);
          return parse(html)
        })
      .then(component => {
          alert('Found job: ' + component);
          return null
      })

      caller.updateBoardResults({company: board.company, jobs: [{ title: title, location: location, url: 'fff'}]});

}

export default processGreenhouse;