const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

//app.use(cors());
app.use(bodyParser.raw());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

const routes = express.Router();

app.use('/api', routes);

routes.route('/companies').get(function(req, res) {
    res.json(Boards);
});

routes.route('/fetch/:company').get(function(req, res) {
    let company = req.params.company;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});



const Boards = [
    {name: "InVision", url:"invision", type: "Greenhouse", notes: "Design tool"},
    {name: "Abstract", url:"abstract", type: "Greenhouse", notes: "Sketch platform"},
]
