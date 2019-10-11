const GreenhouseCore = require("./processors/greenhouse")
const processGreenhouse = GreenhouseCore.processGreenhouse
const processGreenhouseEmbed = GreenhouseCore.processGreenhouseEmbed
const processLever = require("./processors/lever").processLever
const processGoogle = require("./processors/google").processGoogle
const processBreezy = require("./processors/breezy").processBreezy
const processWorkable = require("./processors/workable").processWorkable

exports.Boards = [
    {name: "InVision", url:"invision", processor: processGreenhouse, notes: "Design tool"},
    {name: "Abstract", url:"abstract", processor: processGreenhouse, notes: "Sketch platform"},
    {name: "Mozilla", url:"mozilla", processor: processGreenhouse, notes: "Browser"},
    {name: "Gitlab", url:"gitlab", processor: processGreenhouse, notes: "Git repo"},
    {name: "Github", url:"github", processor: processGreenhouse, notes: "Git repo"},
    {name: "Canonical", url:"canonical", processor: processGreenhouse, notes: "Unix"},
    {name: "Collage.com", url:"collagecom", processor: processGreenhouse, notes: "Online Printing"},
    {name: "CB Insights", url:"cbinsights", processor: processGreenhouse, notes: ""},
    {name: "Security Scorecard", url:"securityscorecard", processor: processGreenhouse, notes: ""},
    {name: "Karat", url:"karat", processor: processGreenhouse, notes: ""},    
    {name: "Algorithmia", url:"algorithmia", processor: processGreenhouse, notes: ""},    
    {name: "ReCharge", url:"recharge", processor: processGreenhouse, notes: ""},       
    //    https://boards.greenhouse.getrake.io/digitalocean98/

    {name: "Platform.sh", url:"platformsh", processor: processGreenhouseEmbed, notes: ""},
    {name: "Doximity", url:"doximity", processor: processGreenhouseEmbed, notes: ""},
    {name: "BetterUp", url:"betterup", processor: processGreenhouseEmbed, notes: ""},
    {name: "Accruent", url:"accruenthq", processor: processGreenhouseEmbed, notes: ""},
    {name: "Webflow", url:"webflow", processor: processGreenhouseEmbed, notes: ""},
    {name: "Stitch Fix", url:"stitchfix", processor: processGreenhouseEmbed, notes: ""},    
    {name: "Thorn", url:"thorn", processor: processGreenhouseEmbed, notes: ""},    
    
    {name: "Medium", url:"medium", processor: processLever, notes: ""},
    {name: "Sonatype", url:"sonatype", processor: processLever, notes: ""},
    {name: "Help Scout", url:"helpscout", processor: processLever, notes: ""},
    {name: "Dribbble", url:"dribbble", processor: processLever, notes: ""},
    {name: "Close.io", url:"close.io", processor: processLever, notes: ""},
    {name: "Chef", url:"chef", processor: processLever, notes: ""},
    {name: "Auth0", url:"auth0", processor: processLever, notes: ""},
    {name: "Articulate", url:"articulate", processor: processLever, notes: ""},
    {name: "Imperfect Foods", url:"imperfectfoods", processor: processLever, notes: ""},
    {name: "15 Five", url:"15five", processor: processLever, notes: ""},
    {name: "Blue Mesa", url:"bluemesahealth", processor: processLever, notes: ""},
    {name: "Spark Fund", url:"sparkfund", processor: processLever, notes: ""},
    {name: "Respondent", url:"respondent", processor: processLever, notes: ""},

    {name: "Tackle.io", url:"tackleio", processor: processGoogle, notes: ""},
    {name: "10up", url:"get10upcom", processor: processGoogle, notes: ""},
    {name: "RStudio", url:"rstudiocom", processor: processGoogle, notes: ""},
    {name: "Teespring", url:"teespringcom", processor: processGoogle, notes: ""},

    {name: "Zipline", url:"retail-zipline", processor: processBreezy, notes: ""},
    {name: "Nearform", url:"nearform", processor: processBreezy, notes: ""},
    {name: "Piggy", url:"piggy-llc", processor: processBreezy, notes: ""},
    {name: "Time Doctor", url:"time-doctor", processor: processBreezy, notes: ""},
    

    {name: "Harvest", url:"harvest", processor: processWorkable, notes: ""},
    {name: "Doist", url:"doist", processor: processWorkable, notes: ""},
    {name: "Barrel", url:"barrel", processor: processWorkable, notes: ""},
    {name: "Grafana", url:"grafana-labs", processor: processWorkable, notes: ""},
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

    
    */