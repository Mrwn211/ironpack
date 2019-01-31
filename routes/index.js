const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

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
		console.log("id", req.user._id);

		User.findById(req.user._id, (err, user) => {
			if (err) return next(err);

			const isEnterprise = user.accountType === "enterprise";

			res.render("profile-edit", {
				isEnterprise,
				message: req.flash("error")
			});
		});
	}
);

module.exports = router;
