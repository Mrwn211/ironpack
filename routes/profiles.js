const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");

//User edit its profile
router.get(
  "/profile/edit/:id",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    User.findOne({ _id: req.params.id })
      .then(profileEdit => {
        res.render("profile/edit", { profileEdit });
      })
      .catch(error => {
        next(error);
      });
  }
);

router.post(
  "/projects/edit/:id",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const {
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
    } = req.body;
    Project.update(
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
        res.redirect("/projects/" + req.params.id);
      })
      .catch(error => {
        next(error);
      });
  }
);

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
