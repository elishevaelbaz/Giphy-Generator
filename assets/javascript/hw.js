

$(document).ready(function(){

    $("button").on("click", function() {
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

        var animalDiv = $("<div>");
        var p = $("<p>");
        p.text("Rating: " + results[i].rating);
        
        var animalImage = $("<img>");
        animalImage.addClass("gif");
        animalImage.attr("src", results[i].images.fixed_height_still.url)

        //give each img an id to refer to later
        animalImage.attr("id", animal+i);
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
        console.log(state);
        console.log(this);
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");


        if (state == "still"){
          $(this).attr("src", animate);
          $(this).attr("data-state", "animate");
        }

        else if (state == "animate"){
          $(this).attr("src", still);
          //change the state to still
          $(this).attr("data-state", "still");

        }

     });

});
 
