$(document).ready(function(){
  var tvShows = ["arrested development", "breaking bad", "scrubs", "the office", "parks and recreation", "mr robot", "the walking dead", "simpsons", "luke cage", "modern family"];

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
    $(this.id).attr('clicked');
    changeTheme();
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
            var still = response.data[i].images.original_still.url;
            var animated = response.data[i].images.original.url;
            var id = response.data[i].id;
            var notStill = response.data[i].images.original.url;
            var showDiv = $("<div class='show'>");
            var rating = response.data[i].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            showDiv.append(displayRating);
            var image = $("<img>").attr({"src": still, "id": id, "height":250});
            var image = $("<img>").attr({"src": animated, "id": id, "height":250});
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
