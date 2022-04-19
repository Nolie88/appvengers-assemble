var apiKey = "2200016b";
let mediaImageEl = document.querySelector("#movie-image");
let mediaTitleEl = document.querySelector("#movie-title");
let movieSearchedEl = document.querySelector("#movie-search");
// function to get the movie name input from the search bar
function handleFormSubmit(form) {
  const movieName = form.querySelector("#input-search").value;
  getApi(movieName);
}

function getApi(movieName) {
  var requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayMovies(data);
    });
  });
}

function displayMovies(data) {
  movieSearchedEl.innerText = "";
  for (i = 0; i < data.Search.length; i++) {
    let mediaDetails = {
      mediaTitle: data.Search[i].Title,
      mediaImage: data.Search[i].Poster,
    };
    let movieSearchContainer = document.createElement("div");
    movieSearchContainer.classList.add("search-display");
    // get movie title
    let movieTile = document.createElement("h3");
    movieTile.appendChild(document.createTextNode(mediaDetails.mediaTitle));
    movieSearchContainer.appendChild(movieTile);

    //get image backgroung
    movieSearchContainer.style.backgroundImage = `url(${mediaDetails.mediaImage})`;
    movieSearchedEl.appendChild(movieSearchContainer);
  }
}
