const routes = require('express').Router();

routes.route('/active-jobs/:userId').get(function(req, res) {
});

routes.route('/ignored-jobs/:userId').get(function(req, res) {
});

routes.route('/add-job/:userId').post(function(req, res) {
});

routes.route('/ignore-job/:userId').post(function(req, res) {
});

routes.route('/archive-job/:userId').post(function(req, res) {
});

module.exports = routes