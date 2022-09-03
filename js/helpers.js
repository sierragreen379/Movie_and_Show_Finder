// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById("genres")

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
}

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById("genres").value;
    return selectedGenre;
}

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById("likeOrDislikeBtns");
    btnDiv.removeAttribute("hidden");
}

// Clear the current media from the screen
const clearCurrentMedia = () => {
    const mediaPosterDiv = document.getElementById("mediaPoster");
    const mediaTextDiv = document.getElementById("mediaText");
    mediaPosterDiv.innerHTML = "";
    mediaTextDiv.innerHTML = "";
}

// After liking a movie/show, clears the current media from the screen and gets another random movie/show
const likeMedia = () => {
    clearCurrentMedia();
    showRandomMedia();
}

// After disliking a movie/show, clears the current media from the screen and gets another random movie/show
const dislikeMedia = () => {
    clearCurrentMedia();
    showRandomMedia();
}

// Create HTML for media poster
const createMediaPoster = (posterPath) => {
    const mediaPosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement("img");
    posterImg.setAttribute("src", mediaPosterUrl);
    posterImg.setAttribute("id", "mediaPoster");

    return posterImg;
}

// Create HTML for media title
const createMediaTitle = (title) => {
    const titleHeader = document.createElement("h1");
    titleHeader.setAttribute("id", "mediaTitle");
    titleHeader.innerHTML = title;

    return titleHeader;
}

// Create HTML for media release date
const createMediaDate = (date) => {
    const year = date.slice(0, 4);
    const mediaDate = document.createElement("h2");
    mediaDate.setAttribute("id", "mediaDate");
    mediaDate.innerHTML = year;

    return mediaDate;
}

// Create HTML for number of seasons in the tv show
const createTvNumOfSeasons = (seasons) => {
    let seasonsWord = "seasons"
    const tvNumOfSeasons = document.createElement("h2");
    tvNumOfSeasons.setAttribute("id", "tvNumOfSeasons");
    if (seasons == 1) {
        seasonsWord = "season"
    }
    tvNumOfSeasons.innerHTML = `${seasons} ${seasonsWord}`;

    return tvNumOfSeasons;
}

// Create HTML for media overview
const createMediaOverview = (overview) => {
    const overviewParagraph = document.createElement("p");
    overviewParagraph.setAttribute("id", "mediaOverview");
    overviewParagraph.innerHTML = overview;

    return overviewParagraph;
}

// Returns a random media item from the first page of media
const getRandomMedia = (media) => {
    const randomIndex = Math.floor(Math.random() * media.length);
    const randomMedia = media[randomIndex];
    return randomMedia;
}

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById("mediaPoster");
    const movieTextDiv = document.getElementById("mediaText");
    const likeBtn = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");

    // Create HTML content containing media info
    const moviePoster = createMediaPoster(movieInfo.poster_path);
    const titleHeader = createMediaTitle(movieInfo.title);
    const movieDate = createMediaDate(movieInfo.release_date);
    const overviewText = createMediaOverview(movieInfo.overview);

    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(movieDate);
    movieTextDiv.appendChild(overviewText);

    showBtns();
    likeBtn.onclick = likeMedia;
    dislikeBtn.onclick = dislikeMedia;
}

// Uses the DOM to create HTML to display the TV show
const displayTvShow = (tvInfo) => {
    const tvPosterDiv = document.getElementById("mediaPoster");
    const tvTextDiv = document.getElementById("mediaText");
    const tvExtraInfoDiv = document.getElementById("mediaExtraInfo");
    const likeBtn = document.getElementById("likeBtn");
    const dislikeBtn = document.getElementById("dislikeBtn");

    // Create HTML content containing media info
    const tvPoster = createMediaPoster(tvInfo.poster_path);
    const titleHeader = createMediaTitle(tvInfo.name);
    const tvDate = createMediaDate(tvInfo.first_air_date);
    const tvNumOfSeasons = createTvNumOfSeasons(tvInfo.number_of_seasons);
    const overviewText = createMediaOverview(tvInfo.overview);

    // Append title, poster, date, number of seasons, and overview to page
    tvPosterDiv.appendChild(tvPoster);
    tvTextDiv.appendChild(titleHeader);
    tvTextDiv.appendChild(tvDate);
    tvTextDiv.appendChild(tvNumOfSeasons);
    tvTextDiv.appendChild(overviewText);

    showBtns();
    likeBtn.onclick = likeMedia;
    dislikeBtn.onclick = dislikeMedia;
}