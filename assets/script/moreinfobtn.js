//create a btn function for each searched movie to redirect to the moreinfo html file

// place this in the end of function getApi(movieName)

// movieSearchedEl.addEventListener("click", function() {
//     var moreinfoLink = "https://www.google.com/"
//     window.location.href = moreinfoLink

// This select description card and put in variable.
const movieDescEl = document.querySelector(".description-card");
let actorsEl = document.querySelector("#actors");
let boxEl = document.querySelector("#box");
let addtofavEl = document.querySelector(".addfav-btn");
console.log(movieDescEl);

// These function for display actors and boxoffice.
const displayMovieData = function (data) {
  console.log(data);
  console.log(1);
  const movieActors = data.Actors;
  const boxOfficeData = data.BoxOffice;
  let mediaDetails = {
    mediaTitle: data.Title,
    mediaImage: data.Poster,
    movieId: data.imdbID,
  };
  addtofavEl.addEventListener("click", () => {
    setItemToLocalStorage(mediaDetails);
  });

  actorsEl.innerText = movieActors;
  boxEl.innerText = boxOfficeData;

  movieDescEl.appendChild(actorsEl);
  movieDescEl.appendChild(boxEl);
};

// This function for get movie ID and get data from specxific movie ID
const getMovieDetails = function () {
  const movieId = window.location.search.split("=")[1];
  const apiKey = "2200016b";
  const requestUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

  if (movieId) {
    fetch(requestUrl).then(function (response) {
      response.json().then(function (data) {
        displayMovieData(data);
      });
    });
  }
};
function setItemToLocalStorage(details) {
  let idKey = details.movieId;
  console.log(idKey);
  let mediaTitle = details.mediaTitle;
  let mediaImage = details.mediaImage;

  let faves = { mediaTitle, mediaImage };

  // Get all the existing favourited movies in Local Storage
  const favesJson = localStorage.getItem("faves") || "{}";

  /**
   * @type {Array}
   */
  const favouriteMovies = JSON.parse(favesJson);

  // Add the latest clicked movie to Local Storage
  if (!favouriteMovies.movieId) {
    //   if (!details.movieId in favouriteMovies) {
    favouriteMovies[idKey] = faves;
  }

  // Resave to LS
  localStorage.setItem("faves", JSON.stringify(favouriteMovies));
}
getMovieDetails();

//add onload function in moreinfo html so that it will load the function once it's open
