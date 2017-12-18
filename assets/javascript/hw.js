
var buttonList = ["dog", "cat", "rabbit", "bird", "hamster", "skunk", "goldfish", "ferret", 
"turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil",
"pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

$(document).ready(function(){

  function displayButtons() {
    // deletes the buttons prior to adding new buttons
    //to prevent duplicates
    $("#animalButtons").empty();

    for (var i = 0; i < buttonList.length; i++){

      var a = $("<button>");
      a.addClass("animal-button");
      a.attr("data-animal", buttonList[i]);
      a.text(buttonList[i]);
      // Add the button to the buttons-view div
      $("#animalButtons").append(a);
    }
  }

  $("#addAnimal").on("click", function(event) {

        event.preventDefault();
        // This line of code will grab the input from the textbox
        var button = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array
        buttonList.push(button);

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();
      });

$(document).on("click", "button", function() {
    // $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div class='images'>");
        var p = $("<p>");
        p.text("Rating: " + results[i].rating);
        
        var animalImage = $("<img>");
        animalImage.addClass("gif");
        animalImage.attr("src", results[i].images.fixed_height_still.url)

        // animalImage.attr("id", animal+i);
        animalImage.attr("data-state", "still")
        animalImage.attr("data-animate", results[i].images.fixed_height.url)
        animalImage.attr("data-still", results[i].images.fixed_height_still.url)

        animalDiv.append(p, animalImage);
        // Prepend the animalDiv variable to the element with an id of animals.
        $("#animals").prepend(animalDiv);
        }

      });
    });

     $(document).on("click", ".gif", function() {

        var state = $(this).attr("data-state");
        
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if (state == "still"){
          $(this).attr("src", animate);
          $(this).attr("data-state", "animate");
        }

        else if (state == "animate"){
          $(this).attr("src", still);
          $(this).attr("data-state", "still");
        }
     });

     displayButtons();

});


 
