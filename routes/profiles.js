const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Skill = require("../models/Skill");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require("../config/cloudinary.js");

//User edit its profile
router.post(
  "/profile/edit",
  uploadCloud.single("photo"),
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
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
      { email: req.body.email },
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
      .then(user => {
        res.redirect("/profile-edit", {
          user: user
        });
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
    User.find().then(ironhackersAll => {
      Skill.find()
        .catch(err => next(err))
        .then(skills => {
          res.render("profiles/list-ironhackers", { ironhackersAll, skills });
        });
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
