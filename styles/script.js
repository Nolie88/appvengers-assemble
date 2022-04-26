var apiKey = "2200016b";
let mediaImageEl = document.querySelector("#movie-image");
let mediaTitleEl = document.querySelector("#movie-title");
let movieSearchedEl = document.querySelector("#movie-search");
let moreInfoEl = document.querySelector(".moreinfo-btn");
let FavsBtn = document.querySelector("#addfav-btn");
let savedHistory = JSON.parse(localStorage.getItem("favourite movies")) || [];


// function to get the movie name input from the search bar
function handleFormSubmit(form) {
    const movieName = form.querySelector("#input-search").value;
    getApi(movieName);
}

function getApi(movieName) {
    var requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

    fetch(requestUrl).then(function(response) {
        response.json().then(function(data) {
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
      movieId: data.Search[i].imdbID,
    };

    let movieSearchContainer = document.createElement("div");
    movieSearchContainer.classList.add("search-display");

    // add meadia poster
    let moviePosterImg = document.createElement("img");
    moviePosterImg.setAttribute("src", mediaDetails.mediaImage);
    movieSearchContainer.appendChild(moviePosterImg);

    // get movie title
    let movieTile = document.createElement("p");
    movieTile.appendChild(document.createTextNode(mediaDetails.mediaTitle));
    movieSearchContainer.appendChild(movieTile);

    // created div to add more info btn and add to fav btn

    let buttonDiv = document.createElement("div");

    //add more info btn
    let moreInfoEL = document.createElement("button");
    moreInfoEL.classList.add("moreinfo-btn");
    moreInfoEL.appendChild(document.createTextNode("more info"));
    buttonDiv.appendChild(moreInfoEL);

    //add to fav btn

    let addToFavBtn = document.createElement("button");
    addToFavBtn.appendChild(document.createTextNode("Add to Fav"));
    buttonDiv.appendChild(addToFavBtn);
    addToFavBtn.classList.add("addfav-btn");

        movieSearchContainer.appendChild(buttonDiv);
        movieSearchedEl.appendChild(movieSearchContainer);

        // get more info of each media
        let queryString = "./moreinfo.html?q=" + mediaDetails.movieId;

        moreInfoEL.addEventListener("click", () => {
            location.assign(queryString);
        });



        // On click rule for saving favourite movie to local storage when 'Add to fave' button is clicked
        addToFavBtn.addEventListener("click", function() {
            setItemToLocalStorage(mediaDetails)
        })

        //Local storage - Function for storing favourite movies

        function setItemToLocalStorage(details) {
            let savedMedia = []
            var movieInform = document.querySelector("#input-search").value;
            savedMedia.push(details);
            localStorage.setItem(movieInform, JSON.stringify(savedMedia));
            console.log(savedMedia)

            let savedMovies = JSON.parse(localStorage.getItem(movieInform)) || [];


        }


        // not sure if TIM //
        // movieSearchedEl.addEventListener("click", function() {
        //   var moreinfoLink = "https://www.google.com/"
        //   window.location.href = moreinfoLink

        // })
    }
}











function displayMediaInfo(details) {
    resultDocumentBackground.style.backgroundImage = mediaDetails.mediaImage;
}