$(document).ready(function() {
  // Getting references to the name inout and condition container, as well as the table body
  var nameInput = $("#condition-name");
  var conditionList = $("tbody");
  var conditionContainer = $(".condition-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Condition
  $(document).on("submit", "#condition-form", handleConditionFormSubmit);
  $(document).on("click", ".delete-condition", handleDeleteButtonPress);

  // Getting the intiial list of Conditions
  getConditions();

  // A function to handle what happens when the form is submitted to create a new Condition
  function handleConditionFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertCondition function and passing in the value of the name input
    upsertCondition({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an condition. Calls getConditions upon completion
  function upsertCondition(conditionData) {
    $.post("/api/conditions", conditionData)
      .then(getConditions);
  }

  // Function for creating a new list row for conditions
  function createConditionRow(conditionData) {
    console.log(conditionData);
    var newTr = $("<tr>");
    newTr.data("condition", conditionData);
    newTr.append("<td>" + conditionData.name + "</td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-condition'>Delete Condition</a></td>");
    return newTr;
  }

  // Function for retrieving conditions and getting them ready to be rendered to the page
  function getConditions() {
    $.get("/api/conditions", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createConditionRow(data[i]));
      }
      renderConditionList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of conditions to the page
  function renderConditionList(rows) {
    conditionList.children().not(":last").remove();
    conditionContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      conditionList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no conditions
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Condition before you can create a Post.");
    conditionContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("condition");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/conditions/" + id
    })
    .then(getConditions);
  }
});
