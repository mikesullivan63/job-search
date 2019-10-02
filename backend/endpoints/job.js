const routes = require('express').Router();
var jwt = require('express-jwt');
var auth = require('./user').auth;

routes.route('/active-jobs', auth).get(function(req, res) {
});

routes.route('/ignored-jobs', auth).get(function(req, res) {
});

routes.route('/add-job', auth).post(function(req, res) {
});

routes.route('/ignore-job', auth).post(function(req, res) {
});

routes.route('/archive-job', auth).post(function(req, res) {
});

module.exports = routes