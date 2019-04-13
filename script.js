let searchForm = document.querySelector('#search-form');
let searchInput = document.querySelector('#search-input');
let gif = document.querySelector('#gif');
let errorElem = document.querySelector('#error');

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    
    displayGif();

    searchInput.value = '';
    searchInput.focus();
});

function displayGif() {
    giphy()
    .then(results => {
        gif.setAttribute('src', results.data[0].images.original.url);
        errorElem.textContent = '';
    })
    .catch(err => {
        console.error(err);
        gif.setAttribute('src', 'giphy.png');
        errorElem.textContent = 'Sorry, no GIF associated with that term!';
    }); 
}

async function giphy() {
    let term = searchInput.value;
    let apiUrl = `https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=${term}&api_key=CLPCegGycqjrikeN3HIOGA2VqXpxcfFT&limit=1`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    
    return data;
}