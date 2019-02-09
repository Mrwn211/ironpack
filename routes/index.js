const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const Skill = require("../models/Skill");
const uploadCloud = require("../config/cloudinary.js");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// /* GET project page */
// router.get("/projects", (req, res, next) => {
// res.render("project", { "message": req.flash("error") });
// });

/* GET profile edit page */
router.get(
  "/profile/edit",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    User.findById(req.user._id, (err, user) => {
      if (err) return next(err);

      const isEnterprise = user.accountType === "enterprise";

      
      
      Skill.find()
        .catch(err => next(err))
        .then(skills => {
          let skills2 = skills.map((skill) => {
            return {_id: skill._id.toString(), name: skill.name};
          });

          res.render("profile-edit", {
            skills: skills2,
            isEnterprise,
            message: req.flash("error"),
            profileEdit: user,
            userSkills: user.skills.map((skill) => skill.toJSON())
          });
        })
      ;
    });
  }
);

module.exports = router;
