const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

const getMovie = () => {
  const movieName = movieNameRef.value;
  const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    result.innerHTML = `
    <div class="message-container">
      <img src="./images/popcorn-icon.svg"/>
      <h3 class="msg">Please enter a movie name </h3>
    </div>  
      `;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
        <div class="info">
          <img src=${data.Poster} class="poster"/>
          <div>
          <h2><a href="https://www.imdb.com/title/${data.imdbID}" target="_blank">${data.Title}</a></h2>
            <div class="rating">
              <img src="./images/star-icon.svg">
              <h4>${data.imdbRating}</h4>
            </div>
            <div class="details">
              <span>${data.Rated}</span>
              <span>${data.Year}</span>
              <span>${data.Runtime}</span>
            </div>
            <div class="genre">
              <div>${data.Genre.split(",").join("</div><div>")}</div>
            </div>
          </div>
        </div>
          <h3>Plot:</h3>
          <p>${data.Plot}</p>
          <h3>Cast:</h3>
          <p>${data.Actors}</p>
          <h3>Writer: </h3>
          <p>${data.Writer}</p>
        `;
        } else {
          result.innerHTML = `
          <div class="message-container">
            <img src="./images/no-search-result-icon.svg"/>
            <h3 class="msg">${data.Error}</h3>
          </div>`;
        }
      })

      .catch(() => {
        result.innerHTML = `<h3 class= msg>Error ocurred</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
movieNameRef.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    return getMovie();
  }
});
window.addEventListener("load", getMovie);
