const API_KEY = "7191655e195a49d7b93879566010bc4d";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById("cards-container");
    const newscardtemplate = document.getElementById("template-news-card");
    cardscontainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardscontainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#source");
    const newsDescription = cardClone.querySelector("#news-description");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} ▪️ ${date} `;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const newsInput = document.getElementById("news-input");

searchButton.addEventListener("click", () => {
    const query = newsInput.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
