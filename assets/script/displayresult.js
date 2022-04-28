let backgroundImageEl = document.querySelector(".bgimage");
let mediaImgEl = document.querySelector("#movie-image");
let mediaHead = document.querySelector("#movie-title");
let mediaPlotEl = document.querySelector("#movie-synopsis");
let mediaGenreEl = document.querySelector("#genre");
let mediaVideoEl = document.querySelector("#videos");
apiKey = "2200016b";

let ytubeApiKey1Tony = "AIzaSyBFEZloPQvEioYfxYyyYd6Hilo4mmztviw";
let ytubeApiKey2Sarah = "AIzaSyB9fIxT4q1wWiPkfCXZYv0ccqra1XNkqYA";
let ytubeApiKey3Tim = "AIzaSyDycQa56_IrJcppRf5iItI8PSm6JOv2srk";
let ytubeApiKey4Orcun = "AIzaSyBwsaaARRLecECAsBOCyD646NWjkh0kcew";
let ytubeApiKey5Sam = "AIzaSyBbosWwT20vBTJeOJ9zQLIwNjHe32LlOn4";
// get movie id from the clicked btn ,

// call the api with the current movie ID

function getParameter() {
  let currentPage = new URLSearchParams(window.location.search);

  let mediaId = currentPage.get("q");

  searchApi(mediaId);
}

// search api to get the more info of the page

function searchApi(mediaId) {
  let requestUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${mediaId}`;
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

  mediaImgEl.setAttribute("src", mediaImage);
  mediaImgEl.setAttribute("alt", `${mediaTitle} image`);
  mediaHead.innerText = mediaTitle;
  mediaPlotEl.innerText = mediaDescp;
  mediaGenreEl.innerText = mediaGenre;
  backgroundImageEl.style.backgroundImage = `url("${mediaImage}")`;
  // backgroundImageEl.setAttribute("background-position", "center");
  // backgroundImageEl.setAttribute("background-repeat", "no-repeat");
  // backgroundImageEl.setAttribute("background-size", "cover");

  let youTubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${data.Title}-trailer&key=${ytubeApiKey3Tim}`;

  fetch(youTubeUrl).then(function (response) {
    response.json().then(function (ydata) {
      console.log(ydata);
      displayVideo(ydata);
    });
  });

  // const a = fetch(youTubeUrl)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (ydata) {
  //     console.log(ydata);
  //     displayVideo(ydata);
  //   });

  // fetch(youTubeUrl)
  //   .then((res) => res.json())
  //   .then((ydata) => {
  //     console.log(ydata);
  //     displayVideo(ydata);
  //   });
}

function displayVideo(ydata) {
  //   for (i = 0; i < ydata.items.length; i++) {
  let videoContainer = document.createElement("div");
  // videoContainer.classList.add("column", "is-full");
  let frame = document.createElement("iframe");
  let frameSrc = ydata.items[0].id.videoId;
  frame.setAttribute("src", `https://www.youtube.com/embed/${frameSrc}`);
  frame.setAttribute("width", "100%");
  frame.setAttribute("height", "500px");
  videoContainer.appendChild(frame);
  mediaVideoEl.appendChild(videoContainer);
}

getParameter();
