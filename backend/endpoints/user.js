const routes = require('express').Router();

routes.route('/register').post(function(req, res) {
});

routes.route('/login').post(function(req, res) {
});

routes.route('/profile/:userId').get(function(req, res) {
});

routes.route('/search-history/:userId/:size/:page').get(function(req, res) {
});

module.exports = routes