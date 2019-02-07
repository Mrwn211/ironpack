// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);

//Delete Projects
$("#deleteProjectModal").on("show.bs.modal", function(e) {
  let projectId = $(e.relatedTarget).data("projectid");
  let $form = $(e.currentTarget).find("form");
  var splitted = $form.attr("action").split("projectid");
  let newAction = splitted[0] + projectId + splitted[1];
  $form.attr("action", newAction);
});

//Edit Projects
// $("#editProjectModal").on("show.bs.modal", function(e) {
//   let projectIdEdit = $(e.relatedTarget).data("projectidedit");
//   let $form = $(e.currentTarget).find("form");
//   $form.attr("action" + projectIdEdit);
// });
