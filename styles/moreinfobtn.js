//create a btn function for each searched movie to redirect to the moreinfo html file 

// place this in the end of function getApi(movieName)

// movieSearchedEl.addEventListener("click", function() {
//     var moreinfoLink = "https://www.google.com/"
//     window.location.href = moreinfoLink

// This select description card and put in variable.
const movieDescEl = document.querySelector('.description-card');
let actorsEl = document.querySelector('#actors');
let boxEl = document.querySelector('#box');
console.log(movieDescEl)



// These function for display actors and boxoffice.
const displayMovieData = function (data) {
    console.log(data);
    console.log(1);
    const movieActors = data.Actors;
    const boxOfficeData = data.BoxOffice;


    actorsEl.innerText = movieActors;
    boxEl.innerText = boxOfficeData;

    movieDescEl.appendChild(actorsEl);
    movieDescEl.appendChild(boxEl);
};


// This function for get movie ID and get data from specxific movie ID
const getMovieDetails = function () {
    const movieId = window.location.search.split('=')[1];
    const apiKey = "2200016b";
    const requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

    if(movieId){
        fetch(requestUrl).then(function (response) {
            response.json().then(function (data) {
                displayMovieData(data);
            });
          });
         
    }
};

getMovieDetails();



//add onload function in moreinfo html so that it will load the function once it's open