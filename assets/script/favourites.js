// Calls local storage
var movieLs = localStorage.getItem("faves");
const movieLsObject = JSON.parse(movieLs);
const savedMovieEl = document.getElementById("saved-movie");

// Populate from Local Storage into favourites page
// for (let i = 0; i < movieLsArray.length; i++) {
//   var movie = movieLsArray[i];

//   const movieCard = createMovieCard(movie);

//   savedMovieEl.append(movieCard);
// }

for (let key in movieLsObject) {
  let mediaDetailsSaved = movieLsObject[key];

  let movieCard = createMovieCard(mediaDetailsSaved);

  savedMovieEl.append(movieCard);
}
