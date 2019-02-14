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
$("#editProjectModal").on("show.bs.modal", function(e) {
  let projectIdEdit = $(e.relatedTarget).data("projectidedit");
  $("#editProjectModal form").attr("action", `/my-projects/${projectIdEdit}`);
  axios
    .get(`/my-projects/${projectIdEdit}`)
    .then(res => {
      $("#name").val(res.data.name);
      $("#summary").val(res.data.summary);
      $("[name='category']").prop("checked", false);
      res.data.category.forEach(category => {
        $(`input[value='${category}']`).prop("checked", true);
      });
      $("[name='duration']").prop("checked", false);
      res.data.duration.forEach(duration => {
        $(`input[value='${duration}']`).prop("checked", true);
      });
      $("[name='skills']").prop("checked", false);
      res.data.skills.forEach(skills => {
        $(`input[value='${skills}']`).prop("checked", true);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//Back to profile
function goBack() {
  window.history.back();
}

//Sidebar
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $(".side-nav .collapse").on("hide.bs.collapse", function() {
    $(this)
      .prev()
      .find(".fa")
      .eq(1)
      .removeClass("fa-angle-right")
      .addClass("fa-angle-down");
  });
  $(".side-nav .collapse").on("show.bs.collapse", function() {
    $(this)
      .prev()
      .find(".fa")
      .eq(1)
      .removeClass("fa-angle-down")
      .addClass("fa-angle-right");
  });
});

//Sidebar filters ironhackers
if (window.location.pathname == "/ironhackers-page") {
  $("#filters :checkbox").click(function() {
    if ($("#filters :checkbox:checked").length <= 0) {
      $(".ironhacker-item").show();
    } else {
      $(".ironhacker-item").hide();
      $("#filters :checkbox:checked").each(function() {
        $(".skill-item[data-skill=" + $(this).val() + "]")
          .parents(".ironhacker-item")
          .show();
      });
    }
  });
}

//Sidebar filters projects
if (window.location.pathname == "/projects-page") {
  $("#filters :checkbox").click(function() {
    if ($("#filters :checkbox:checked").length <= 0) {
      $(".project-item").show();
    } else {
      $(".project-item").hide();
      $("#filters :checkbox:checked").each(function() {
        $(
          "p.category-item[data-category=" +
            $(this).val() +
            "], .skill-item-project[data-skill-project=" +
            $(this).val() +
            "]"
        )
          .parents(".project-item")
          .show();
      });
    }
  });
}
