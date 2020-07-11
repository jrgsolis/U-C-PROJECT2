$(document).ready(function() {
  /* global moment */

  // dashboardContainer holds all of our posts
  var dashboardContainer = $(".dashboard-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .then(function() {
      alert('post deleted!');
      $(`[data-post=${id}]`).remove();
    });
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var id = $(this)
      .closest('[data-post]')
      .attr("data-post");
    deletePost(id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var id = $(this)
      .closest('[data-post]')
      .attr("data-post");
    window.location.href = "/cms?post_id=" + id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Condition #" + id;
    }
    dashboardContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    dashboardContainer.append(messageh2);
  }

});

$("#search-btn").on("click", function() {
  var searchedGame = $("#game-search").val().trim();
  searchedGame = searchedGame.replace(/\s+/g, "").toLowerCase();
  /*
  $.get("/api/search/" , function(data) {
    console.log(data);
  });
  */
 window.location.href = "/api/search/";
});
