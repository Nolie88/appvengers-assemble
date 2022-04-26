let resultBackground = document.getElementsByTagName("body")[0];
let mediaImgEl = document.querySelector("#movie-image");
let mediaHead = document.querySelector("#movie-title");
let mediaPlotEl = document.querySelector("#movie-synopsis");
let mediaGenreEl = document.querySelector("#genre");
let mediaVideoEl = document.querySelector("#videos");
apiKey = "2200016b";

let ytubeApiKey = "AIzaSyBbosWwT20vBTJeOJ9zQLIwNjHe32LlOn4";
// get movie id from the clicked btn ,

// call the api with the current movie ID

function getParameter() {
  let currentPage = new URLSearchParams(window.location.search);

  let mediaId = currentPage.get("q");

  searchApi(mediaId);
}

// search api to get the more info of the page

function searchApi(mediaId) {
  let requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${mediaId}`;
  fetch(requestUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      displayMoreInfo(data);
    });
  });
}

//function to display more info of the media selected

function displayMoreInfo(data) {
  let mediaTitle = data.Title;
  let mediaDescp = data.Plot;
  let mediaGenre = data.Genre;
  let mediaImage = data.Poster;

  //   resultBackground.style.backgroundImage(`url(${mediaImage})`);
  mediaImgEl.setAttribute("src", mediaImage);
  mediaHead.innerText = mediaTitle;
  mediaPlotEl.innerText = mediaDescp;
  mediaGenreEl.innerText = mediaGenre;

  let youTubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${data.Title}&key=${ytubeApiKey}`;

  fetch(youTubeUrl).then(function (response) {
    response.json().then(function (ydata) {
      console.log(ydata);
      displayVideo(ydata);
    });
  });
}

function displayVideo(ydata) {
  //   for (i = 0; i < ydata.items.length; i++) {
  let videoContainer = document.createElement("div");
  let frame = document.createElement("iframe");
  let frameSrc = ydata.items[0].id.videoId;
  frame.setAttribute("src", `https://www.youtube.com/embed/${frameSrc}`);
  frame.setAttribute("width", "100%");
  frame.setAttribute("height", "500px");
  videoContainer.appendChild(frame);
  mediaVideoEl.appendChild(videoContainer);
}

getParameter();
