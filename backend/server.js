const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
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
    }
    return
});

async function processGreenhouse(board, title, location, res) {
    const GreenhouseRoot = "https://boards.greenhouse.io/"

    console.log('Fetching: ' + GreenhouseRoot + board.url);

    let data = null;

    request.get(GreenhouseRoot + board.url, async (error, response, body) => {
        if(error) {
            console.log('Error loading board: ' + board + ' - ' + error);
            data = {company: board.company, error: 'Error: ' + error};
        }

        if(response.statusCode != 200){
            console.log('Error loading board: ' + board + ' - ' + response.statusCode + ": " + response.statusMessage)
            data = {company: board.company, error: 'Response: ' + response.statusCode + ": " + response.statusMessage};
        } 

        const $ = cheerio.load(body);
        let jobs = [];

        //console.log($('div.opening'));

        $('div.opening')
            .filter((i,el) => $(el).find('a').text().toLowerCase().indexOf(title) !== -1)
            .filter((i,el) => $(el).find('span.location').text().toLowerCase().indexOf(location) !== -1 )
            .each((i,el) => {
                jobs = jobs.concat({
                    title:      $(el).find('a').text(), 
                    location:   $(el).find('span.location').text(), 
                    url:        $(el).find('a').attr('href')
                });
            });
        
        console.log('returning: ' + jobs.length);

        data = {company: board.company, jobs: jobs};
    });

    await res.json(data);
};

const Boards = [
    {name: "InVision", url:"invision", type: "Greenhouse", notes: "Design tool"},
    {name: "Abstract", url:"abstract", type: "Greenhouse", notes: "Sketch platform"},
]
