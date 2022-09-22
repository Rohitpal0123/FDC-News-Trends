// variables

const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

//Array of news types

var newsDataArr = [];

//Apis from newsapi.org

const API_KEY = "ddfe90cad6ad4720ae8cf02b056256a6";
const HEADLINE_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const TECHNOLOGY_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const ENTERTAINMENT_NEWS =
  "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

//Initial content load

window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

//script for API fetching content as per option available on navigation bar

generalBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>General News</h4>";
  fetchGeneralNews();
});

businessBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Business</h4>";
  fetchBusinessNews();
});

sportsBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Sports</h4>";
  fetchSportsNews();
});

technologyBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Technology</h4>";
  fetchTechnologyNews();
});

entertainmentBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Entertaiment</h4>";
  fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search :" + newsQuery.value + "</h4>";
  fetchQueryNews();
});

// defining each fetch_____News function for fetching API

const fetchHeadlines = async () => {
  const response = await fetch(HEADLINE_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h4>No News Found</h4>";
  }

  displayNews();
};

const fetchGeneralNews = async () => {
  const response = await fetch(GENERAL_NEWS + API_KEY);
  newsDataArr = [];
  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    // handle errors
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  displayNews();
};

const fetchBusinessNews = async () => {
  const response = await fetch(BUSINESS_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No News Found</h5>";
    return;
  }

  displayNews();
};

const fetchSportsNews = async () => {
  const response = await fetch(SPORTS_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No News Found</h5>";
    return;
  }

  displayNews();
};

const fetchTechnologyNews = async () => {
  const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No News Found</h5>";
    return;
  }

  displayNews();
};

const fetchEntertainmentNews = async () => {
  const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No News Found</h5>";
    return;
  }

  displayNews();
};

const fetchQueryNews = async () => {
  if (newsQuery.value === null) return;

  const response = await fetch(
    SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY
  );
  newsDataArr = [];

  if (response.status >= 200 && response.status < 300) {
    const myJson = await response.json();
    newsDataArr = myJson.articles;
  } else {
    //handle the ERRORS
    console.log(response.status, response.statusText);
    newsDetails.innerHTML = "<h5>No News Found</h5>";
    return;
  }

  displayNews();
};
// defining displaynews function for above piece of script
// displaynews function defined to arrange the fetched content appropriately into rows and column

function displayNews() {
  newsDetails.innerHTML = "";

  newsDataArr.forEach((news) => {
    var date = news.publishedAt.split("T");

    var col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    var card = document.createElement("div");
    card.className = "p-2";

    var image = document.createElement("img");
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    var cardBody = document.createElement("div");

    var newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    var dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    var description = document.createElement("p");
    description.className = "text-muted";
    description.innerHTML = news.description;

    var link = document.createElement("a");
    link.className = "btn btn-dark";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read More";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsDetails.appendChild(col);
  });
}
