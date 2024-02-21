const apiKey = '7d1866b2d63743e6abcf19dc1286688a';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Log data here if needed
        return data.articles || []; // Ensure articles array is returned even if it's empty or undefined
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click" , async ()=> {
    const query = searchField.value.trim()
    if(query != ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlog(articles)
        }catch{
            console.log("Error fetching news by query" , error)
        }
    }
 })

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        // console.log(data); // Log data here if needed
        return data.articles || []; // Ensure articles array is returned even if it's empty or undefined
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || ''; // Use empty string as fallback if urlToImage is not available
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = 
            article.title.length > 30
            ? article.title.slice(0,30) + "....  " : article.title;
        title.textContent = truncatedTitle || ''; // Use empty string as fallback if title is not available

        const description = document.createElement("p"); // Fix typo here
        const truncatedDesc = 
            article.description.length > 40
            ? article.description.slice(0,40) + "....  " : article.description;
        title.textContent = truncatedDesc || '';
        
        description.textContent = article.description || ''; // Use empty string as fallback if description is not available

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click" , () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch(error) {
        console.error("Error fetching random news ", error);
    }
})();
