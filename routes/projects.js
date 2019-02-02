const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

//Entreprise adds new projects
router.get("/my-projects", (req, res) => {
  res.render("projects/my-projects");
});

router.post("/my-projects", (req, res, next) => {
  const { name, category, summary, skills, duration } = req.body;
  const newProject = new Project({
    name: name,
    owner: req.user.id,
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
      res.render("/my-projects");
    });
});

// //Ironhacker voit les projets
// router.get("/projects", (req, res, next) => {
// 	Project.find()
// 		.then(listOfProjects => {
// 			res.render("projects/index", { listOfProjects });
// 		})
// 		.catch(error => {
// 			next(error);
// 		});
// });

//Enterprise delete Projects
router.post("/my-projects/:id/delete", (req, res, next) => {
  let projectId = req.params.id;
  Project.findByIdAndRemove({ _id: projectId })
    .then(project => {
      res.redirect("/my-projects");
    })
    .catch(error => {
      next(error);
    });
});

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

// //Inronhacker see the Details Page
// router.get("/projects/:id", (req, res, next) => {
// 	let projectId = req.params.id;
// 	Project.findOne({ _id: projectId })
// 		.then(projectDetail => {
// 			res.render("projects/show", { projectDetail });
// 		})
// 		.catch(error => {
// 			next(error);
// 		});
// });

module.exports = router;
