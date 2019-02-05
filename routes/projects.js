const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const ensureLogin = require("connect-ensure-login");

// Enterprise's list of projects
router.get(
  "/my-projects",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Project.find({ owner: req.user.id })
      .then(listOfProjects => {
        res.render("projects/my-projects", { listOfProjects });
      })
      .catch(error => {
        next(error);
      });
  }
);
//Enterprise adds new projects
router.get(
  "/my-projects",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res) => {
    res.render("projects/my-projects");
  }
);

router.post(
  "/my-projects",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const { name, category, summary, skills, duration } = req.body;
    const newProject = new Project({
      name: name,
      owner: req.user._id,
      category: category,
      summary: summary,
      skills: req.skills,
      duration: duration
    });
    newProject
      .save()
      .then(project => {
        res.redirect("my-projects");
      })
      .catch(error => {
        console.log(error);
        res.render("projects/my-projects");
      });
  }
);

//Deleting one project
router.post(
  "/my-projects/:id/delete",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let projectId = req.params.id;
    Project.findByIdAndRemove({ _id: projectId })
      .then(listOfProjects => {
        res.redirect("/my-projects");
      })
      .catch(error => {
        next(error);
      });
  }
);

// //Enterprise edit Projects
// router.get("/projects/edit/:id", (req, res, next) => {
// 	Project.findOne({ _id: req.params.id })
// 		.then(projectEdit => {
// 			res.render("projects/edit", { projectEdit });
// 		})
// 		.catch(error => {
// 			next(error);
// 		});
// });

// router.post("/projects/edit/:id", (req, res, next) => {
// 	const { name, owner, category, summary, skills, duration } = req.body;
// 	Project.update(
// 		{ _id: req.params.id },
// 		{ $set: { name, owner, category, summary, skills, duration } },
// 		{ new: true }
// 	)
// 		.then(project => {
// 			res.redirect("/projects/" + req.params.id);
// 		})
// 		.catch(error => {
// 			next(error);
// 		});
// });

//Ironhacker see all the projects
router.get(
  "/projects-page",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Project.find()
      .then(projectsAll => {
        res.render("projects/list-projects", { projectsAll });
      })
      .catch(error => {
        next(error);
      });
  }
);

// //Inronhacker see one particular project
router.get(
  "/project-detail/:id",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let projectId = req.params.id;
    Project.findOne({ _id: projectId })
      .then(projectDetail => {
        res.render("projects/project-detail", { projectDetail });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = router;
