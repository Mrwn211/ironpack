const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require("../config/cloudinary.js");

//User edit its profile
router.get(
  "/profile/edit",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    User.findOne({ _id: req.user.id })
      .then(profileEdit => {
        res.render("profile/edit", { profileEdit });
      })
      .catch(error => {
        next(error);
      });
  }
);

router.post("/profile/edit",uploadCloud.single('photo'),(req, res, next) => {
  const {
    email,
    password,
    firstname,
    lastname,
    companyName,
    skills,
    lastJob,
    experiences,
    resume,
    linkedinProfile
  } = req.body;

  const image = req.file.url;

  User.update(
    { _id: req.params.id },
    {
      $set: {
        email,
        password,
        firstname,
        lastname,
        companyName,
        image,
        skills,
        lastJob,
        experiences,
        resume,
        linkedinProfile
      }
    },
    { new: true }
  )
    .then(project => {
      res.redirect("/profile/" + req.params.id);
    })
    .catch(error => {
      next(error);
    });
});

//Enterprise see all the ironhackers
router.get(
  "/ironhackers-page",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    User.find()
      .then(ironhackersAll => {
        res.render("profiles/list-ironhackers", { ironhackersAll });
      })
      .catch(error => {
        next(error);
      });
  }
);

//Enterprise see one ironhacker
router.get(
  "/ironhacker-detail/:id",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let ironhackerId = req.params.id;
    User.findOne({ _id: ironhackerId })
      .then(ironhackerDetail => {
        res.render("profiles/ironhacker-detail", { ironhackerDetail });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = router;
