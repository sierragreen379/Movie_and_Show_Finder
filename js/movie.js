const tmdbKey = "";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch (error) {
        console.log(error);
    }
}

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/discover/movie";
    const randomPage = Math.floor(Math.random() * 1000 + 1);
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    } catch (error) {
        console.log(error);
    }
}

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const movieInfo = await response.json();
            console.log(movieInfo);
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMedia = async () => {
    const movieInfo = document.getElementById("mediaInfo");
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMedia();
    }
    const movies = await getMovies();
    const randomMovie = getRandomMedia(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
}

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMedia;