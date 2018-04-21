//Array Animal Names for Gify Search Buttons
var topics = [
  "dog",
  "cat",
  "rabbit",
  "hamster",
  "skunk",
  "goldfish",
  "bird",
  "ferret",
  "frog",
  "bat"
];

//Functions
//=================================
//On-load function to populate Topics Buttons
function topicsButtons() {
  $("#topicsButtons").empty();
  topics.forEach(function(topic) {
    var button = $("<button>");
    button.attr("class", "topic");
    button.attr("data-value", topic);
    button.text(topic);

    $("#topicsButtons").append(button);
  });
} //End topicsButtons()

function runQuery() {
    console.log("Ran runQuery()")
    var queryTerm = $(this).attr("data-value");
    console.log(queryTerm);
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" +
         queryTerm +
          "&api_key=x7oNJdQEJjV7faucQ1qvm98f7MG5SQnN" +
          "&limit=10"; 

  //Ajax Function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(gifsRecieved) {
    console.log(gifsRecieved);

    //$("#search-results").text(JSON.stringify(gifsRecieved));

    //Clear out gif container
    var gifContainer = $("#gif-container-main");
    gifContainer.empty();

    var imageLink = gifsRecieved.data[1].images.original;
    //var imageLink = imageLink.split(",");
    var cleanedImageLink = "";
//loopover gifsRecieved and create dom 
    for (var i = 0; i < imageLink[i]; i++) {
      cleanedImageLink += imageLink[i];
      console.log(cleanedImageLink);
    }
    // console.log(gifsRecieved.data[1].images.original);
    // //Create our html elements
    // for (var i = 0; i< gifsRecieved.data.length; i++) {
    //     var newImg = $("<img>");

    //     console.log(gifsRecieved.data[i].images.original)
    //     newImg.attr("src",gifsRecieved.data[i].original);
    //     gifContainer.append(newImg);
    // }
  });
}

$(document).ready(function() {
  //Generate Buttons for search words from topics Array
  topicsButtons();

  //1. Retrieve all search values when search button is clicked (and clear out the old?)
  $("#search-button").on("click", function() {
    event.preventDefault();
    var queryTerm = $("#search-text-input")
    .val()
    .trim();
    topics.push(queryTerm);
    console.log(topics);
    topicsButtons();
    /////////////////////////////////
    //Retrieve All Search Input Values
    // /////////////////////////////////
    // var queryURL ;
   
    // //Website (Just giphy for now)
    // var website = $("#gif-website-selection").val();

    // //# of Results
    // var quantity = $("#quantity-input-selection").val();

    // //Rating
    // var rating = $("#rating-input").val();

    // //URL Construction
    // console.log(queryTerm, website, quantity, rating);
    // switch (website) {
    //   //Giphy is selected
    //   case "a":
    //     queryURL =
    //       "https://api.giphy.com/v1/gifs/search?q=" +
    //       queryTerm +
    //       "&api_key=x7oNJdQEJjV7faucQ1qvm98f7MG5SQnN" +
    //       "&rating=" +
    //       rating +
    //       "&limit=" +
    //       quantity;

    //     break;

    //   case "b":
    //     break;

    //   case "c":
    //     break;
    //   default:
    //     break;
    // }

    
  });
  $(document).on("click", ".topic", runQuery());
});
