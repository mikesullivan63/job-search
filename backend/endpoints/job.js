const routes = require('express').Router();
const passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Job = mongoose.model('Job');
var UserJobs = mongoose.model('UserJobs');


var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


routes.get('/active-jobs', auth, function(req, res) { 
  protectedRequest(req, res, (req, res) => {
    UserJobs
        .findOne({userId: req.payload._id})
        .exec((err, userJobs) => {
          if(err) {
            res.status(500).json({
              "message" : "Error during lookup: " + err 
            })
          } else {
            res.status(200);
            if(userJobs) {
              res.json(userJobs.active);    
            } else {
              res.json([]);    
            }
          }
        });  
  });
});

routes.get('/ignored-jobs', auth, function(req, res) {
    protectedRequest(req, res, (req, res) => {
        UserJobs
            .findOne({userId: req.payload._id})
            .exec((err, userJobs) => {
              if(err) {
                res.status(500).json({
                  "message" : "Error during lookup: " + err 
                })
              } else {
                res.status(200);
                if(userJobs) {
                  res.json(userJobs.ignored);    
                } else {
                  res.json([]);    
                }
              }
            });  
      });
});

routes.post('/add-job', auth, function(req, res) {
    protectedRequest(req, res, (req, res) => {
        UserJobs
            .findOne({userId: req.payload._id})
            .exec((err, userJobs) => {
              if(err) {
                res.status(500).json({
                  "message" : "Error during lookup: " + err 
                })
              } else {
                if(!userJobs) {
                  userJobs = new UserJobs();
                  userJobs.userId = req.payload._id;
                }

                var job = new Job();
                job.board = req.body.board;
                job.url = req.body.url;
                job.title = req.body.title;
                job.location = req.body.location;

                userJobs.active = userJobs.active.slice().concat(job);
      
                userJobs.save(function(err) {
                    if(err) {
                      res.status(500).json({
                        "message" : "Error during save: " + err 
                      })
                    } else {
                      res.status(200);
                      res.json("OK");  
                    }
                });
            }  
      });
    });
});

routes.post('/ignore-job', auth, function(req, res) {
    protectedRequest(req, res, (req, res) => {
        UserJobs
            .findOne({userId: req.payload._id})
            .exec((err, userJobs) => {
              if(err) {
                res.status(500).json({
                  "message" : "Error during lookup: " + err 
                })
              } else {
                if(!userJobs) {
                  userJobs = new UserJobs();
                  userJobs.userId = req.payload._id;
                }

                var job = new Job();
                job.board = req.body.board;
                job.url = req.body.url;
                job.title = req.body.title;
                job.location = req.body.location;

                userJobs.ignored = userJobs.ignored.slice().concat(job);
      
                userJobs.save(function(err) {
                    if(err) {
                      res.status(500).json({
                        "message" : "Error during save: " + err 
                      })
                    } else {
                      res.status(200);
                      res.json("OK");  
                    }
                });
            }  
      });
    });
});

routes.post('/archive-job', auth, function(req, res) {
    protectedRequest(req, res, (req, res) => {
        UserJobs
            .findOne({userId: req.payload._id})
            .exec((err, userJobs) => {
              if(err) {
                res.status(500).json({
                  "message" : "Error during lookup: " + err 
                })
              } else {
                jobToIgnore = userJobs.active.find((job) => {job._id === req.body.jobId});
                if(jobToIgnore) {
                    userJobs.active = userJobs.active.filter((job) => {job._id !== req.body.jobId});
                    userJobs.ignored = userJobs.ignored.slice().concat(jobToIgnore);
    
                    userJobs.save(function(err) {
                        if(err) {
                          res.status(500).json({
                            "message" : "Error during save: " + err 
                          })
                        } else {
                          res.status(200);
                          res.json("OK");  
                        }
                    });
                }
            }  
      });
    });
});

function protectedRequest(req, res, body) {
  if (req && ( !req.payload || !req.payload._id)) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    body(req, res);
  }
}

module.exports = routes
