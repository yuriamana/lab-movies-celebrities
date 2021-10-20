const router = require("express").Router();
// const express = require("express");
const CelebrityModel = require("./../models/Celebrity.model");
const MovieModel = require("./../models/movie.model");

router.get("/celebrities", async (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch(next);
});

router.get("/celebrities/create", (req, res, next) => {
  console.log(res.render);
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res, next) => {
  try {
    console.log(req.body);
    await CelebrityModel.create(req.body);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/celebrities/edit/:id", async (req, res, next) => {
  try {
    const celebrity = await CelebrityModel.findById(req.params.id);
    res.render("celebrities/edit-celebrity", { celebrity });
  } catch (err) {
    next(err);
  }
});

router.post("/celebrities/edit/:id", async (req, res, next) => {
  try {
    await CelebrityModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
    res.redirect("celebrities/edit/:id");
  }
});

router.post("/celebrities/delete/:id", async (req, res, next) => {
  try {
    await CelebrityModel.findByIdAndDelete(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
