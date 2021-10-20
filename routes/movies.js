const router = require("express").Router();
const CelebrityModel = require("./../models/Celebrity.model");
const MovieModel = require("./../models/movie.model");

router.get("/movies", async (req, res, next) => {
  MovieModel.find().populate("cast")
    .then((movies) => res.render("movies/movie", { movies }))
    .catch(next);
});

router.get("/movies/create", (req, res, next) => {
  CelebrityModel.find()
    .populate("cast")
    .then((celebrities) => res.render("movies/new-movie", { celebrities }));
});

router.post("/movies/create", async (req, res, next) => {
  try {
    await MovieModel.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    next(err);
    res.render("movies/new-movie");
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    await MovieModel.findById(req.params.id)
      .populate("cast")
      .then((movie) => {
        res.render("movies/movie-details", { movie });
      });
  } catch (err) {
    next(err);
  }
});

router.post("/movies/edit/:id", async (req, res, next) => {
  try {
    const celebrity = await CelebrityModel.find();
    const movie = await MovieModel.find();

    MovieModel.findById(req.params.id).populate("cast")
    .then((movie) => {
        console.log(movie)
        res.render("movies/edit-movie", { movie, celebrity })
    })
  } catch (err) {
    next(err);
    res.redirect("movies/edit/:id");
  }
});

router.post("/movies/delete/:id", (req, res, next) => {
  MovieModel.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch(next);
});

module.exports = router;
