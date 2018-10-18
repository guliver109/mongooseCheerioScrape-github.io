// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        // Delete button
        //$("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>")
        $("#notes").append("<button class='delete' data-id='" + data._id + "' id='savenote'>Delete Note</button>")
        
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  $(document).on("click", "#scrape", function() {
    // AJAX POST call to the submit route on the server
    // This will take the data from the form and send it to the server
    $.ajax({
      type: "GET",
      url: "/scrape",
  
    }).then(function(data) {
      // Add the title and delete button to the #results section
        window.location.reload();
      });
  });
//   $("#delete").on("click", function() {
//     // Make an AJAX GET request to delete the notes from the db
//     $.ajax({
//       type: "GET",
//       dataType: "json",
//       url: "/clearall",
//       // On a successful call, clear the #results section
//       success: function(response) {
//         $("#results").empty();
//       }
//     });
//  });
  // When user clicks the delete button for a note
$(document).on("click", ".delete", function() {
    console.log($(this).attr("data-id"))
    // Save the p tag that encloses the button
    var selected = $(this).attr("data-id");
    // Make an AJAX GET request to delete the specific note
    // this uses the data-id of the p-tag, which is linked to the specific note
    $.ajax({
      type: "DELETE",
      url: "/delete/" + selected      
    }).then(function(data) {
        // Add the title and delete button to the #results section
          window.location.reload();
        });
  });