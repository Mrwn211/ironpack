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
      .populate("skills")
      .catch(err => next(err))
      .then(listOfProjects => {
        Skill.find()
          .catch(err => next(err))
          .then(skills => {
            res.render("projects/my-projects", { listOfProjects, skills });
          });
        // res.render("projects/my-projects", { listOfProjects });
      });
  }
);
//Enterprise adds new projects
// router.get(
//   "/my-projects",
//   ensureLogin.ensureLoggedIn("/auth/login"),
//   (req, res) => {
//     res.render("projects/my-projects");
//   }
// );

router.post(
  "/my-projects",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const { name, category, summary, skills, duration } = req.body;

    const newProject = new Project({
      name,
      owner: req.user._id,
      category,
      summary,
      skills,
      duration
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

// Enterprise edits Projects
router.get("/my-projects/:id", (req, res, next) => {
  let projectIdEdit = req.params.id;
  Project.findOne({ _id: projectIdEdit })
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      next(error);
    });
});

router.post(
  "/my-projects/:id",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let projectIdEdit = req.params.id;
    const { name, category, summary, skills, duration } = req.body;
    Project.update(
      { _id: projectIdEdit },
      { $set: { name, category, summary, skills, duration } },
      { new: true }
    )
      .then(project => {
        res.redirect("/my-projects");
      })
      .catch(error => {
        next(error);
      });
  }
);

//Ironhacker see all the projects
// router.get(
//   "/projects-page",
//   ensureLogin.ensureLoggedIn("/auth/login"),
//   (req, res, next) => {
//     Project.find()
//       .then(projectsAll => {
//         res.render("projects/list-projects", { projectsAll });
//       })
//       .catch(error => {
//         next(error);
//       });
//   }
// );

router.get(
  "/projects-page",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Project.find({
      // accountType: "enterprise"
    })
      .populate("skills")
      .then(projectsAll => {
        // projectsAll = projectsAll.map(project => {
        //   project.skills = project.skills.map(skill => skill.toJSON());
        //   return project;
        // });
        Skill.find()
          .catch(err => next(err))
          .then(skills => {
            res.render("projects/list-projects", {
              projectsAll,
              skills
            });
          });
      })
      .catch(error => {
        next(error);
      });
  }
);

//Inronhacker see one particular project
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
