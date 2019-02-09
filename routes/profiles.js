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
      firstname,
      lastname,
      companyName,
      skills,
      lastJob,
      resume,
      linkedinProfile
    } = req.body;

    let $set = {
      email,
      firstname,
      lastname,
      companyName,
      skills,
      lastJob,
      resume,
      linkedinProfile
    };

    // on met a jour l'image que si fichier envoyé
    if (req.file) {
      $set.image = req.file.url;
    }

    User.update(
      { email: req.body.email },
      {
        $set
      },
      { new: true }
    )
      .then(() => {
        res.redirect("/profile/edit");
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
    User.find({
      accountType: "ironhacker"
    })

      .populate("skills")
      .then(ironhackersAll => {
        ironhackersAll = ironhackersAll.map(ironhacker => {
          ironhacker.skills = ironhacker.skills.map(skill => skill.toJSON());
          ironhacker.image;
          return ironhacker;
        });
            
        Skill.find()
          .catch(err => next(err))
          .then(skills => {

            res.render("profiles/list-ironhackers", {
              ironhackersAll, skills
            });
          });
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
