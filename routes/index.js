const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET project page */
router.get("/projects", (req, res, next) => {
  res.render("projects/index", { message: req.flash("error") });
});

module.exports = router;
