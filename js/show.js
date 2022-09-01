const tmdbKey = "";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/tv/list";
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

const getTvShows = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverTvShowEndpoint = "/discover/tv";
    const randomPage = Math.floor(Math.random() * 304 + 1);
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverTvShowEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const shows = jsonResponse.results;
            return shows;
        }
    } catch (error) {
        console.log(error);
    }
}

const getTvShowInfo = async (show) => {
    const showId = show.id;
    const tvShowEndpoint = `/tv/${showId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${tvShowEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const tvShowInfo = await response.json();
            return tvShowInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

// Gets a list of tv shows and ultimately displays the info of a random show from the list
const showRandomMedia = async () => {
    const tvShowInfo = document.getElementById("mediaInfo");
    if (tvShowInfo.childNodes.length > 0) {
        clearCurrentMedia();
    }
    const shows = await getTvShows();
    const randomShow = getRandomMedia(shows);
    const info = await getTvShowInfo(randomShow);
    displayTvShow(info);
}

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMedia;