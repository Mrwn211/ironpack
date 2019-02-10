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

//Sidebar filters
// $("#filters :checkbox").click(function() {
//   $(".card").hide();
//   $("#filters :checkbox:checked").each(function() {
//     $("." + $(this).val()).show();
//   });
// });

$("input:checkbox").on("change", function() {
  var a = $("input:checkbox:checked")
    .map(function() {
      return $(this).val();
    })
    .get();
});
