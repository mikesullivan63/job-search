const request = require('request-promise-native');
const cheerio = require('cheerio')

module.exports = (board, url, title, location, jobSelector, titleExtractor, locationExtractor, linkExtractor, res) => {
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
            //console.log("Done parsing: " + jobs.length);
            res.json({company: board.name, url: url, jobs: jobs});
        }).catch((error) => {
            if(error) {
                console.log('Error loading board: ' + board.name + ' - ' + error);
                res.json({company: board.name, error: error.stack});
            }
        });
}

function matchTitle(needle, haystack) {
    return haystack.toLowerCase().indexOf(needle) !== -1
}

function matchLocation(needle, haystack) {
    //console.log('Looking for ' + needle + ' in ' + haystack);
    return haystack.toLowerCase().indexOf(needle) !== -1
}
