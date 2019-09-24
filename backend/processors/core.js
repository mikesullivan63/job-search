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
                .filter((i,el) => match(title, titleExtractor($(el),$)))
                .filter((i,el) => match(location, locationExtractor($(el),$)))
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
                res.json({company: board.name, error: error.message});
            }
        });
}


function match(needles, haystack) {
    lowerStack = haystack.toLowerCase()
    if(needles === "") { return true; }

    return needles
        .toLowerCase()
        .split(" or ")
        .some((needle) => lowerStack.indexOf(needle) !== -1);
}
