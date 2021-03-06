const routes = require("express").Router();
const auth = require("../config/jwt").auth;

const Boards = require("../boards/boards");

routes.route("/companies", auth).get(function(req, res) {
  let sorted = Boards.Boards.slice().sort((l, r) => {
    if (l.name > r.name) {
      return 1;
    }
    if (l.name < r.name) {
      return -1;
    }
    return 0;
  });
  res.json({ companies: sorted });
});

routes.route("/:company/:title/:location", auth).get(function(req, res) {
  let company = req.params.company;
  let title = req.params.title.toLowerCase();
  let location = req.params.location.toLowerCase();
  let board = Boards.Boards.find(el => el.name === company);

  if (!board) {
    return null;
  }

  board
    .processor(board, title, location)
    .then(result => {
      result.status = "COMPLETED";
      return result;
    })
    .then(result => res.json(result))
    .catch(error =>
      res.json({ company: board.name, url: board.url, status: "ERROR", error })
    )
    .finally(() => res.end());
});

module.exports = routes;
