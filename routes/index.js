const router = require("express").Router();
const celebritiesRouter = require("./../models/Celebrity.model");
const moviesRouter = require("./../models/movie.model");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
