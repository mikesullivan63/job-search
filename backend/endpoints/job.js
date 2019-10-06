const routes = require('express').Router();
var jwt = require('express-jwt');
var protectedRequest = require('./user').protectedRequest;

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
              res.json(userJobs.active);  
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
                  res.json(userJobs.ignored);  
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
                userJobs.active = userJobs.active.slice().concat({
                    board: req.body.board, 
                    url: req.body.url, 
                    title: req.body.title,
                    location: req.body.location});
      
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
                userJobs.ignored = userJobs.ignored.slice().concat({
                    board: req.body.board, 
                    url: req.body.url, 
                    title: req.body.title,
                    location: req.body.location});
      
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

module.exports = routes
