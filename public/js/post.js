$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and condition select
  var contactNameInput = $("#contact_name");
  var emailInput = $("#email");
  var phoneInput = $("#phone");
  var priceInput = $("#price");
  var titleInput = $("#title");
  var descriptionInput =  $("#description");
  var nameInput= $("#name");
  var slugInput = $("#slug"); 
  var metacriticInput= $("#metacritic");
  var releasedInput = $("#released");
  var backgroundInput= $("#background");
  var websiteInput= $("#website"); 
  var gameidInput = $("#gameid");


  var cmsForm = $("#cms");
  var conditionSelect = $("#condition");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var conditionId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an condition_id in our url, preset the condition select box to be our Condition
  else if (url.indexOf("?condition_id=") !== -1) {
    conditionId = url.split("=")[1];
  }

  // Getting the conditions, and their posts
  getConditions();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or condition
    /*
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !conditionSelect.val()) {
      return;
    }
    */
    // Constructing a newPost object to hand to the database
    var newPost = {
      contact_name: contactNameInput
        .val()
        .trim(),
      email: emailInput
        .val()
        .trim(),
      phone: phoneInput
        .val()
        .trim(),
      price: priceInput
        .val()
        .trim(),
      name: nameInput
        .val()
        .trim(),
      slug: slugInput
        .val()
        .trim(),
      description_raw: descriptionInput
        .val()
        .trim(),
      metacritic: metacriticInput
        .val()
        .trim(),
      released: releasedInput
        .val()
        .trim(),
      background_image: backgroundInput
        .val()
        .trim(),
      website: websiteInput
        .val()
        .trim(),
      gameId: gameidInput
        .val()
        .trim(),
      ConditionId: conditionSelect.val(),
      
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to dashboard page upon completion
  function submitPost(post) {
    $.post("/api/posts", post, function () {
      window.location.href = "/listings";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an condition's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "condition":
        queryUrl = "/api/conditions/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data.ConditionId || data.id)
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        conditionId = data.ConditionId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Conditions and then render our list of Conditions
  function getConditions() {
    $.get("/api/conditions", renderConditionList);
  }
  // Function to either render a list of conditions, or if there are none, direct the user to the page
  // to create an condition first
  function renderConditionList(data) {
    if (!data.length) {
      window.location.href = "/conditions";
    }
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createConditionRow(data[i]));
    }
    conditionSelect.empty();
    console.log(rowsToAdd);
    console.log(conditionSelect);
    conditionSelect.append(rowsToAdd);
    conditionSelect.val(conditionId);
  }

  // Creates the condition options in the dropdown
  function createConditionRow(condition) {
    var listOption = $("<option>");
    listOption.attr("value", condition.id);
    listOption.text(condition.name);
    return listOption;
  }

  // Update a given post, bring user to the dashboard page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function () {
        window.location.href = "/listings";
      });
  }
});
