const url = "https://api.giphy.com/v1/gifs/";
const key = "?api_key=mdqTnzhoU2eK0wnx3w0DO8Bk4eos9ZBH";
const searchBtn = document.getElementById("searchButton");
const nextPage = document.getElementById("next");
const prevPage = document.getElementById("previous");
let q;
let fetchUrl;
let ratingA;
let searchType;
let keyword;
let response;
let data;

async function apiCall(){
    document.querySelector(".resultsFlexbox").innerHTML = "";

    ratingA = `&rating=${document.querySelector('input[name="rating"]:checked').value}`;
    searchType = document.querySelector('input[name="searchType"]:checked').value;
    keyword = document.getElementById("searchTermBox").value;
    q = `&q=${keyword}`;
    console.log(searchType);
    console.log(q);
    
    if (searchType === "search") {
        fetchUrl = `${url}${searchType}${key}${q}${ratingA}`;
    } else if (searchType === "trending") { 
        fetchUrl = `${url}${searchType}${key}${ratingA}`
    }

    console.log(fetchUrl);

    response = await fetch(fetchUrl);
    data = await response.json();
    console.log(data);
    display(data);
}

function display(data) {
    let results= document.querySelector(".resultsFlexbox");
    for (i = 0; i<data.data.length; i++){
        let image = document.createElement("img");
        image.setAttribute("class", "img-fluid");
        image.src = data.data[i].images.fixed_height.url;
        results.appendChild(image);
    }
}

searchBtn.addEventListener("click", apiCall);
