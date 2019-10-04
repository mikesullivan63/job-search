var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/job-search', {useNewUrlParser: true}, (error) =>{
    if(error){
        console.log("Error connecting to Mongo Database: " + error);
    } else {
        console.log("Connected to Mongo Database");
    }
});