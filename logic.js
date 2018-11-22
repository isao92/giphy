
var musics = ["guitar", "bass", "drums", "vocals"];

// Calling the renderButtons function at least once to display the initial list of musics
renderButtons();

// Adding click event listen listener to all buttons
$(document).on("click", "button", function () {
  // Grabbing and storing the data-music property value from the button
  var music = $(this).attr("data-music");

  // Constructing a queryURL using the music name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    music + "&api_key=VyCPkrTDB92IWuJWrpCk7pSielFlATAp&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var musicDiv = $("<p>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var musicImage = $("<img>");
        var stateIs = "still";
        // Setting the src attribute of the image to a property pulled off the result item
        musicImage.attr("src", results[i].images.fixed_height_still.url);
        musicImage.attr("data-still", results[i].images.fixed_height_still.url);
        musicImage.attr("data-animate", results[i].images.fixed_height.url);
        musicImage.attr("data-state", stateIs);
        musicImage.attr("class", results[i].type);


        // Appending the paragraph and image tag to the musicDiv
        musicDiv.append(p);
        musicDiv.append(musicImage);

        // Prependng the musicDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(musicDiv);
        
    console.log("This is just before the end of on click function for button1");
      }

      
    console.log("This is just before the end of on click function for button2");
    });
    

});


$("#add-music").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var music = $("#music-input").val().trim();
  // The music from the textbox is then added to our array
  musics.push(music);

  // calling renderButtons which handles the processing of our music array
  renderButtons();

  //track array musics
  console.log("Inside add-music on click this is the array musics: " + musics);
});



// Function for displaying music data
function renderButtons() {

  // Deleting the music buttons prior to adding new music buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#musics-view").empty();

  // Looping through the array of musics
  for (var i = 0; i < musics.length; i++) {

    // Then dynamicaly generating buttons for each music in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("music");
    // Adding a data-attribute with a value of the music at index i
    a.attr("data-music", musics[i]);
    // Providing the button's text with a value of the music at index i
    a.text(musics[i]);
    // Adding the button to the HTML
    $("#musics-view").append(a);

    //track array musics
    console.log("inside renderbuttons function this is the array musics: " + musics);

    
  }
}


// gif click function to animate
$(document).on("click", ".gif", function () {

  // track click on gifs
  console.log("Clicked on .gif, inside function")
  
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});



