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
    let sorted = Boards.slice().sort((l,r) => {
            if (l.name > r.name) return 1;
            if (l.name < r.name) return -1;
            return 0;
    });
    res.json({companies: sorted});
});

routes.route('/:company/:title/:location').get(function(req, res) {
    let company = req.params.company;
    let title = req.params.title.toLowerCase();
    let location = req.params.location.toLowerCase();
    let board = Boards.find((el) => el.name === company);

    if(!board) { return null; } 

    switch(board.type) {
        case "Greenhouse": processGreenhouse(board, title, location, res); break;
        case "GreenhouseEmbed": processGreenhouseEmbed(board, title, location, res); break;
        case "Lever": processLever(board, title, location, res); break;
        case "Google": processGoogle(board, title, location, res); break;
        case "Breezy": processBreezy(board, title, location, res); break;

        default: console.log("Error with board type: " + board.type);
    }
});

function matchTitle(needle, haystack) {
    return haystack.toLowerCase().indexOf(needle) !== -1
}

function matchLocation(needle, haystack) {
    //console.log('Looking for ' + needle + ' in ' + haystack);
    return haystack.toLowerCase().indexOf(needle) !== -1
}
function processGreenhouse(board, title, location, res) {
    processGreenhouseCore(
        board, title, location,
        "https://boards.greenhouse.io/"+board.url,
        "https://boards.greenhouse.io/",
         res);
}
function processGreenhouseEmbed(board, title, location, res) {
    processGreenhouseCore(board, title, location, 
        "https://boards.greenhouse.io/embed/job_board?for="+board.url,
        "",
        res);
}

function processGreenhouseCore(board, title, location, url, linkurl,res) {
    processBoardPage(board, url, title, location, 
        'div.opening',
        (el) => el.find('a').text(), 
        (el) => el.find('span.location').text(), 
        (el) => linkurl + el.find('a').attr('href'),
        res);
};


function processLever(board, title, location, res) {
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
    processBoardPage(board, "https://jobs.lever.co/" + board.url, title, location, 
        'div.posting',
        (el) => el.find('[data-qa=posting-name]').text(), 
        (el) => el.find('span.sort-by-location').text(), 
        (el) => el.find('a.posting-title').attr('href'),
        res);
};

function processGoogle(board, title, location, res) {
    /*
    <li data-positionid="P_AAAAAACAAJZHZE3lvPT2nK" class="bb-public-jobs-list__job-item ptor-jobs-list__item">
        <a href="https://hire.withgoogle.com" target="_blank" class="bb-public-jobs-list__item-link">
            <span class="bb-public-jobs-list__job-item-title ptor-jobs-list__item-job-title">Senior Software Engineer, Build Automation - Ursa Labs</span>
            <span class="bb-public-jobs-list__job-item-location ptor-jobs-list__item-location">USA</span>
        </a>
    </li>
    */
    
    processBoardPage(board, "https://hire.withgoogle.com/public/jobs/" + board.url, title, location, 
        'a.bb-public-jobs-list__item-link',
        (el) => el.find('span.bb-public-jobs-list__job-item-title').text(), 
        (el) => el.find('span.bb-public-jobs-list__job-item-location').text(), 
        (el) => el.attr('href'),
        res);
};

function processBreezy(board, title, location, res) {
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
   processBoardPage(board, "https://" +  board.url + ".breezy.hr/", title, location, 
   'li.position.transition a',
   (el) => el.find('h2').text(), 
   (el,$) => el.find('li').map((i, el) => $(el).text()).get().join(' '), 
   (el) => "https://" +  board.url + ".breezy.hr" + el.attr('href'),
   res);
};


function processBoardPage(board, url, title, location, jobSelector, titleExtractor, locationExtractor, linkExtractor, res) {
    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    request.get(options)
        .then(($) => {
            let jobs = [];
            $(jobSelector)
                .filter((i,el) => matchTitle(title, titleExtractor($(el),$)))
                .filter((i,el) => matchLocation(location, locationExtractor($(el),$)))
                .each((i,el) => {
                    jobs = jobs.concat({
                        title:      titleExtractor($(el),$), 
                        location:   locationExtractor($(el),$), 
                        url:        linkExtractor($(el),$)
                    });
                });
            console.log("Done parsing: " + jobs.length);
            res.json({company: board.name, url: url, jobs: jobs});
        }).catch((error) => {
            if(error) {
                console.log('Error loading board: ' + board.name + ' - ' + error);
                res.json({company: board.name, error: 'Error: ' + error.message});
            }
        });
}

const Boards = [
    {name: "InVision", url:"invision", type: "Greenhouse", notes: "Design tool"},
    {name: "Abstract", url:"abstract", type: "Greenhouse", notes: "Sketch platform"},
    {name: "Mozilla", url:"mozilla", type: "Greenhouse", notes: "Browser"},
    {name: "Gitlab", url:"gitlab", type: "Greenhouse", notes: "Git repo"},
    {name: "Github", url:"github", type: "Greenhouse", notes: "Git repo"},
    {name: "Canonical", url:"canonical", type: "Greenhouse", notes: "Unix"},
    {name: "Collage.com", url:"collagecom", type: "Greenhouse", notes: "Online Printing"},
    //    https://boards.greenhouse.getrake.io/digitalocean98/

    {name: "Platform.sh", url:"platformsh", type: "GreenhouseEmbed", notes: ""},
    {name: "Doximity", url:"doximity", type: "GreenhouseEmbed", notes: ""},
    {name: "BetterUp", url:"betterup", type: "GreenhouseEmbed", notes: ""},
    
    {name: "Medium", url:"medium", type: "Lever", notes: ""},
    {name: "Sonatype", url:"sonatype", type: "Lever", notes: ""},
    {name: "Help Scout", url:"helpscout", type: "Lever", notes: ""},
    {name: "Dribbble", url:"dribbble", type: "Lever", notes: ""},
    {name: "Close.io", url:"close.io", type: "Lever", notes: ""},
    {name: "Chef", url:"chef", type: "Lever", notes: ""},
    {name: "Auth0", url:"auth0", type: "Lever", notes: ""},
    {name: "Articulate", url:"articulate", type: "Lever", notes: ""},
    {name: "Imperfect Produce", url:"imperfectproduce", type: "Lever", notes: ""},
    {name: "15 Five", url:"15five", type: "Lever", notes: ""},

    {name: "Tackle.io", url:"tackleio", type: "Google", notes: ""},
    {name: "10up", url:"get10upcom", type: "Google", notes: ""},
    {name: "RStudio", url:"rstudiocom", type: "Google", notes: ""},

    {name: "Zipline", url:"retail-zipline", type: "Breezy", notes: ""},
    {name: "Nearform", url:"nearform", type: "Breezy", notes: ""},
    {name: "Piggy", url:"piggy-llc", type: "Breezy", notes: ""},
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

    https://madewithlove.recruitee.com/

    https://olo.theresumator.com/

    https://harvest.workable.com/
    */

