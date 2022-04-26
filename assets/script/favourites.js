// Calls local storage
var movieLs = localStorage.getItem("faves");
const movieLsArray = JSON.parse(movieLs);
const savedMovieEl = document.getElementById('saved-movie');

// Populate from Local Storage into favourites page
for (let i = 0; i < movieLsArray.length; i++) {
    var movie = movieLsArray[i];

    const movieCard = createMovieCard(movie);

    savedMovieEl.append(movieCard);
}