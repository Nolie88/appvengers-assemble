
var apiKey = "2200016b";


// function to get the movie name input from the search bar
function handleFormSubmit(form) {
  const movieName = form.querySelector("#input-search").value;
  getApi(movieName);
}

function getApi(movieName) {
  var requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;

  fetch(requestUrl)
  .then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      
    
    })
    
  })

}
