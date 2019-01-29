const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

/* Listing the Projects */
router.get("/projects", (req, res, next) => {
  Project.find()
    .then(listOfProjects => {
      res.render("projects/index", { listOfProjects });
    })
    .catch(error => {
      next(error);
    });
});

//Deleting Projects
router.post("/projects/:id/delete", (req, res, next) => {
  let projectId = req.params.id;
  Project.findByIdAndRemove({ _id: projectId })
    .then(project => {
      res.redirect("/projects");
    })
    .catch(error => {
      next(error);
    });
});

//Editing Projects
router.get("/projects/edit/:id", (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then(projectEdit => {
      res.render("projects/edit", { projectEdit });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/projects/edit/:id", (req, res, next) => {
  const { name, owner, category, summary, skills, duration } = req.body;
  Project.update(
    { _id: req.params.id },
    { $set: { name, owner, category, summary, skills, duration } },
    { new: true }
  )
    .then(project => {
      res.redirect("/projects/" + req.params.id);
    })
    .catch(error => {
      next(error);
    });
});

//The Project Details Page
router.get("/projects/:id", (req, res, next) => {
  let projectId = req.params.id;
  Project.findOne({ _id: projectId })
    .then(projectDetail => {
      res.render("projects/show", { projectDetail });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
