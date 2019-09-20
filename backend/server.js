const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request-promise-native');
//const parse5 = require('parse5');
const cheerio = require('cheerio')
const PORT = 4000;

app.use(cors());
//app.use(bodyParser.raw());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const routes = express.Router();

app.use('/api', routes);

routes.route('/companies').get(function(req, res) {
    res.json(Boards);
});

routes.route('/fetch/:company/:title/:location').get(function(req, res) {
    let company = req.params.company;
    let title = req.params.title;
    let location = req.params.location;
    let board = Boards.find((el) => el.name === company);

    if(!board) { return null; } 

    if(board.type === "Greenhouse") {
        console.log('Before call...');
        const data = processGreenhouse(board, title, location, res);
        console.log('After call...');
        //res.json(data);
    }
    return
});

function processGreenhouse(board, title, location, res) {
    const GreenhouseRoot = "https://boards.greenhouse.io/"

    console.log('Fetching: ' + GreenhouseRoot + board.url);

    var options = {
        uri: GreenhouseRoot + board.url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    request.get(options)
        .then(($) => {
            let jobs = [];
            $('div.opening')
                .filter((i,el) => $(el).find('a').text().toLowerCase().indexOf(title) !== -1)
                .filter((i,el) => $(el).find('span.location').text().toLowerCase().indexOf(location) !== -1 )
                .each((i,el) => {
                    jobs = jobs.concat({
                        title:      $(el).find('a').text(), 
                        location:   $(el).find('span.location').text(), 
                        url:        GreenhouseRoot + $(el).find('a').attr('href')
                    });
                });
            console.log("Done parsing: " + jobs.length);
            res.json({company: board.company, jobs: jobs});
    }).catch((err) => {
        if(error) {
            console.log('Error loading board: ' + board + ' - ' + error);
            res.json({company: board.company, error: 'Error: ' + error});
        }
    });
};

const Boards = [
    {name: "InVision", url:"invision", type: "Greenhouse", notes: "Design tool"},
    {name: "Abstract", url:"abstract", type: "Greenhouse", notes: "Sketch platform"},
    {name: "Mozilla", url:"mozilla", type: "Greenhouse", notes: "Browser"},
    {name: "Gitlab", url:"gitlab", type: "Greenhouse", notes: "Git repo"},
    {name: "Github", url:"github", type: "Greenhouse", notes: "Git repo"},
    {name: "Canonical", url:"canonical", type: "Greenhouse", notes: "Unix"},
    {name: "Collage.com", url:"collagecom", type: "Greenhouse", notes: "Online Printing"},
    //    https://boards.greenhouse.getrake.io/digitalocean98/


]


    /*
    https://www.hashicorp.com/jobs#engineering
    https://www.sitepen.com/about/jobs.html
    https://stackoverflow.com/jobs?q=Manager&r=true
    https://stackoverflow.com/company/work-here
    https://www.voxnest.com/careers
        https://www.voxnest.com/careers/fullstack-engineer-php-nodejs
    https://particular.net/careers
    https://www.parse.ly/careers
    https://www.olark.com/jobs/
    https://marsbased.com/jobs/
    https://www.lullabot.com/jobs
    https://www.igalia.com/jobs/
    https://www.heroku.com/careers
        https://www.heroku.com/careers/heroku-platform-support-engineer-88
        https://salesforce.wd1.myworkdayjobs.com/en-US/External_Career_Site
    https://heap.io/careers/jobs
    https://gradle.com/careers/
    https://careers.ghost.org/ 
    https://fire-engine-red.com/careers/
    https://www.fairwinds.com/careers
    https://jobs.elastic.co/jobs/department/engineering#/
    https://duckduckgo.com/hiring/#open
    https://www.datadoghq.com/jobs-engineering/#all
    https://journey.buffer.com/
    https://basecamp.com/about/jobs
    https://balsamiq.com/company/jobs/openings/
    https://automattic.com/work-with-us/
    https://www.aha.io/company/careers/current-openings
    https://stripe.com/jobs

    https://boards.greenhouse.io/embed/job_board?for=platformsh
    https://boards.greenhouse.io/embed/job_board?for=doximity
    https://boards.greenhouse.io/embed/job_board?for=betterup

    https://hire.withgoogle.com/public/jobs/tackleio
    https://hire.withgoogle.com/public/jobs/get10upcom
    https://hire.withgoogle.com/public/jobs/rstudiocom

    https://jobs.lever.co/medium
    https://jobs.lever.co/sonatype
    https://jobs.lever.co/helpscout/
    https://jobs.lever.co/dribbble/
    https://jobs.lever.co/close.io/
    https://jobs.lever.co/chef/
    https://jobs.lever.co/auth0
    https://jobs.lever.co/articulate/
    https://jobs.lever.co/imperfectproduce
    https://jobs.lever.co/15five

    https://retail-zipline.breezy.hr/
    https://nearform.breezy.hr/
    https://piggy-llc.breezy.hr/

    https://madewithlove.recruitee.com/

    https://olo.theresumator.com/

    https://harvest.workable.com/
    */

