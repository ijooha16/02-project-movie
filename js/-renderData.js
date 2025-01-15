//영화 카드 렌더
function renderData(data, movieListContent) {
  movieListContent.innerHTML = ''
  
  data.forEach((movie) => {
    //평점 별로 바꾸기

    if (
      movie.vote_average && 
      movie.vote_count && 
      movie.backdrop_path && 
      movie.release_date &&
      movie.poster_path &&
      movie.overview
    ) {
      const rate_star = function () {
        let rate = movie.vote_average;
        let count = Math.floor(rate / 2);
        
        return "★ ".repeat(count).trim();
      };
      
  
      //영화 카드 삽입
      const movieCard = document.createElement("div");
  
      movieCard.setAttribute("id", movie.id);
      movieCard.setAttribute("class", "card");
      movieCard.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`;
      movieCard.innerHTML = `
        <div class="card_overlay"></div>
        <p>${rate_star()}</p>
        <h3>${movie.title}</h3>
        `;
  
      movieListContent.append(movieCard);
    }
  });
}

export default renderData;