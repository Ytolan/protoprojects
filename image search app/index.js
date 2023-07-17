const accessKey  = "byw2hcDVRlAg1UNk2zzb5S5nkdjJIw__PBpEJ0HKTak";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";

async function searchImages(){
    inputData = searchInputEl.value;
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    searchImages();
});

