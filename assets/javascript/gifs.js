$(document).ready(function(){
  var tvShows = ["Arrested Development", "Breaking Bad", "Scrubs", "The Office", "Parks and Recreation", "Mr Robot", "Always Sunny in Philadephia", "The Simpsons", "The Good Place", "Modern Family"];

    function makeButtons (){
      $("#show-buttons").empty();
      for (var i = 0; i < tvShows.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("show");
        newButton.attr("data-name", tvShows[i]);
        newButton.text(tvShows[i]);
        $("#show-buttons").append(newButton);
      };
    };

  $("#submit-show").on("click", function(event) {
    event.preventDefault();
    var newShow = $("#show-input").val().trim();
    tvShows.push(newShow);
    makeButtons();
  });

  function animateGif() {
    if ($(this).attr("data-state") ==="still") {
      $(this).attr("src", $(this).attr('data-animate'));
      $(this).attr("data-state", 'animate');
    }
    else {
      $(this).attr("src", $(this).attr('data-still'));
      $(this).attr("data-state", "still");
    }
  }

  function changeTheme() {
      var show = $(this).attr("data-name");
      var changeURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=K4KU6OMUATEW1UmbAjY53j4ZGoSI0e9Y";
      $.ajax({
        url: changeURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
        $("#show-gifs").empty();
          for (var i = 0; i < 10; i++) {
            var image = response.data[i].images.original_still.url;
            var animated = response.data[i].images.original.url;
            var id = response.data[i].id;
            var showDiv = $("<div class='show'>");
            var rating = response.data[i].rating;
            var displayRating = $("<h2>").text("Rating: " + rating);
            showDiv.append(displayRating);
            image = $("<img>").attr({"src": image, "id": id, "height":250, "data-still": image, "data-animate": animated, "data-state": 'still', "class": 'gif'});
            showDiv.append(image);
            $("#show-gifs").append(showDiv);
          }
      });
  }

    $(document).on("click", "img", animateGif);
    $(document).on("click", "button", changeTheme);

makeButtons();
});
//end of document ready function
