// Gif Javascript 

// begin document.ready function
$(document).ready(function() {

// ====================
// FIRST COME VARIABLES
// ====================

// make a gifc object to hold variables and functions
// elements of the object include the following
// animals: array of all selected animals used to populate buttons
// currentSelection: the button the user pressed (if needed)
// userInput: the favorite anumal the user entered via the form
// giphyApiUrl: the base url for giffy api access
// giphyApiKey: public beta key for non-production giphy usage 
// renderButtons: function to render the buttons
// displayGifs: function to display gifs that correspond to button click
// and also to toggle between animated and still
var gifObj = {
	animals: ["Puppies", "Kittens", "Dolphins", "Birds", "Lions", "Whales"],
	currentSelection: "",
	userInput: "",
	giphyApiUrl: "https://api.giphy.com/v1/gifs/search?",
	giphyApiKey: "dc6zaTOxFJmzC",
	renderButtons: function() {
		// first empty the buttons bar/column
		$("#buttonsBar").empty();
		// then cycle through the Animal array and populate the buttons
		for (var i = 0; i < this.animals.length; i++) {
			var a = $("<button>");
			a.addClass("buttons btn btn-primary");
			a.attr("data-name", this.animals[i]);
			a.text(this.animals[i]);
			$("#buttonsBar").append(a);
		}
		// then add on-clicks for each of the buttons
		$(".buttons").on("click", function() {
			// console.log("button pressed");
			// in this case, this refers to the button clicked
			gifObj.currentSelection = $(this).attr("data-name");
			gifObj.displayGifs();
		});
	},
	displayGifs: function() {
		console.log(this.currentSelection);
		// first build the ajax query based on current button clicked
		var animalToDisplay = this.currentSelection;
		// use an &limit of 12 to grab 12 images
		var queryURL = this.giphyApiUrl + "&q=" + animalToDisplay + "&limit=12&api_key=" + this.giphyApiKey;

		// make the ajax query and store the response
		$.ajax({url: queryURL, method: "GET"}).done(function(response) {
			console.log(response);
	
			$("#gifsWindow").empty();
			for (var i = 0; i < response.data.length; i++) {
				
				var showObject = response.data[i];
				var showStill = response.data[i].images.fixed_height_small_still.url;
				var showMoving = response.data[i].images.fixed_height_small.url;
				var showRating = response.data[i].rating;
				console.log("Object: " + showObject);
				console.log("Still: " + showStill);
				console.log("Moving: " + showMoving);
				console.log("Rating: " + showRating);

				var showDiv = $("<div class='show col-md-4'>");
				// first in the div will be the rating
				var pOne = $("<p>").text("Rating: " + showRating);
				// append the rating into the div
				showDiv.append(pOne);
				// next will come the image starting in still mode
				var image = $("<img>").attr("src", showStill);
				// attach a myShowImage class to the image and store
				// the still image and the moving image links in data attributes
				image.addClass("myShowImage");
				image.attr("data-still", showStill);
				image.attr("data-moving", showMoving);
				// append the image into the div
				showDiv.append(image);
				// finally append the constructed div into the gifsWindow div
				$("#gifsWindow").append(showDiv);
			}

			// create on clicks for each image that has been displayed
			$(".myShowImage").on("click", function() {
	
				if ($(this).attr("src") == $(this).attr("data-still")) {
					$(this).attr("src", $(this).attr("data-moving"));
				} else if ($(this).attr("src") == $(this).attr("data-moving")) {
					$(this).attr("src", $(this).attr("data-still"));
				}

			});

		});
	}
};


$("#addAnimal").on("click", function() {
	gifObj.userInput = $("#animalInput").val().trim();

	if (gifObj.userInput != "") {
		gifObj.animals.unshift(gifObj.userInput);
		gifObj.renderButtons();
	}
	// reset the form
	$("input#animalInput").val("");
	return false;
});

gifObj.renderButtons();

});