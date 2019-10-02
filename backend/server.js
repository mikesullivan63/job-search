const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 4000;


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options("*", cors());

app.use('/api', require('./endpoints/api'));
app.use('/user', require('./endpoints/user'));

app.use(express.static(path.join(__dirname, "/../client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


