
const title = document.getElementById('title');
const poster = document.getElementById('poster');
const plot = document.getElementById('plot');
const filmSearch = document.getElementById('filmSearch');
const filmWrap = document.getElementById('filmWrap');
const libraryWrap = document.getElementById('libraryWrap');
const imdblink = document.getElementById('imdbLink');
const moviedblink = document.getElementById('theMovieDbLink');
const newFilmButton = document.getElementById('newFilm');
const saveFilmButton = document.getElementById('saveFilm');
const toggleButton1 = document.getElementById('toggle1');
const toggleButton2 = document.getElementById('toggle2');
const exportButton = document.getElementById('exportFilm');
const filmContainer = document.getElementById('filmContainer')
let latestFilm;
let currentFilmData ;
let savedFilms = [];

fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${MOVIE_DB_AUTH}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        latestFilm = data.id;
        return parseInt(data.id);
    })
   .then(data => {
        getMovie(data);
    })
    .catch(err => {
        console.log(err);
    });

    
function getMovie(lastMovieID) {
    let movieID = Math.floor(Math.random() * lastMovieID);
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${MOVIE_DB_AUTH}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.adult === true || !data.title || !data.poster_path || !data.overview) {
                getMovie(movieID);
            } else {
                title.textContent = `${data.title} (${data.release_date.slice(0,4)})`;
                filmSearch.setAttribute('href',`https://www.google.com/search?q=${title.textContent.split(' ').join('+')}+film&tbm=vid`);
                imdblink.setAttribute('href',`https://www.imdb.com/title/${data.imdb_id}`);
                moviedblink.setAttribute('href',`https://www.themoviedb.org/movie/${data.id}`);
                poster.src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
                poster.setAttribute('alt', `movie poster for ${title.textContent}`);
                plot.innerHTML = `${data.overview}`;
                currentFilmData = data;
            };
        });
    };

function downloadCSV() {
    ids = savedFilms.map( function (film) {
        return film.id;
    });

    let csvContent = "tmdbID, \n" + ids.join(", \n");

    let csvData = new Blob([csvContent], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvData);
    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = "SavedFilms" + '.csv';
    hiddenElement.click();
            };

function switchContent() {
    if (libraryWrap.classList.contains('hide')) {
        filmWrap.classList.add('hide');
        libraryWrap.classList.remove('hide');
        if (savedFilms.length === 0) {
            noFilmsMessage = document.createElement('h2');
            noFilmsMessage.textContent = 'No Saved Films';
            libraryWrap.appendChild(noFilmsMessage);
        } else {showLibrary()}
    } else if (filmWrap.classList.contains('hide')) {
        libraryWrap.classList.add('hide');
        filmWrap.classList.remove('hide');
        removeAllChildNodes(filmContainer)
        noFilmsMessage.parentNode.removeChild(noFilmsMessage)
    };
};

function showLibrary() {
    savedFilms.forEach( function (object, index) {
        filmListItem = document.createElement('div')
        filmListItem.classList.add('filmItem')
        filmListItem.id = `film-${index +1}`
        filmPoster = document.createElement('img')
        filmPoster.src = `https://image.tmdb.org/t/p/w300/${object.poster_path}`
        filmTitle = document.createElement('p')
        filmTitle.textContent = object.title
        deleteButton = document.createElement('button')
        deleteButton.innerHTML = 'Remove From List'
        deleteButton.addEventListener('click', function (e) 
        {savedFilms.splice(index, 1);
        removeAllChildNodes(filmContainer);
        showLibrary(); })
        filmListItem.appendChild(filmTitle)
        filmListItem.appendChild(filmPoster)
        filmListItem.appendChild(deleteButton)
        filmContainer.appendChild(filmListItem)
    }
        )

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


newFilmButton.addEventListener('click' , function (e) { getMovie(latestFilm); });

saveFilmButton.addEventListener('click' , function (e) {if (savedFilms.includes(currentFilmData) === false) savedFilms.unshift(currentFilmData)} );

exportButton.addEventListener('click' , function (e) { downloadCSV()});

toggleButton1.addEventListener('click', switchContent);   

toggleButton2.addEventListener('click', switchContent);     


