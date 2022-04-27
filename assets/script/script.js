var apiKey = "2200016b";
let mediaImageEl = document.querySelector("#movie-image");
let mediaTitleEl = document.querySelector("#movie-title");
let movieSearchedEl = document.querySelector("#movie-search");
let moreInfoEl = document.querySelector(".moreinfo-btn");
let FavsBtn = document.querySelector("#addfav-btn");
var savedMovies = document.querySelector("#saved-movie");

// function to get the movie name input from the search bar
function handleFormSubmit(form) {
  const movieName = form.querySelector("#input-search").value;
  getApi(movieName);
}
// Function calling the API
function getApi(movieName) {
  var requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayMovies(data);
    });
  });
}

// Function to display the data based on the API database + user search.
// The rest of the elements are now in sharedmovies.js file.
function displayMovies(data) {
  movieSearchedEl.innerText = "";
  for (i = 0; i < data.Search.length; i++) {
    let mediaDetails = {
      mediaTitle: data.Search[i].Title,
      mediaImage: data.Search[i].Poster,
      movieId: data.Search[i].imdbID,
    };

    //Add to Fav btn
    const movieSearchContainer = createMovieCard(mediaDetails);
    const buttonDiv = movieSearchContainer.querySelector("div");
    let addToFavBtn = document.createElement("button");
    addToFavBtn.appendChild(document.createTextNode("Add To Fav"));
    buttonDiv.appendChild(addToFavBtn);
    addToFavBtn.classList.add("addfav-btn");

    movieSearchedEl.appendChild(movieSearchContainer);

    // Get more info for each movie
    let queryString = "./moreinfo.html?q=" + mediaDetails.movieId;

    const moreInfoEL = movieSearchContainer.querySelector("button");
    moreInfoEL.addEventListener("click", () => {
      location.assign(queryString);
    });

    // On click rule for saving favourite movie to local storage when 'Add to fave' button is clicked
    addToFavBtn.addEventListener("click", function () {
      setItemToLocalStorage(mediaDetails);
    });

    //Local storage - Function for storing favourite movies

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
  }
}

function displayMediaInfo(details) {
  resultDocumentBackground.style.backgroundImage = mediaDetails.mediaImage;
}
