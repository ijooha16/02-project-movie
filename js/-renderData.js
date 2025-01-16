//영화 카드 렌더
function renderData(data, movieListContent) {
  //movie > 정보.영화
  data.forEach((movie) => {
    //영화 정보 다 있는 경우
    //평점 별로 바꾸기
    if (
      movie.vote_average && 
      movie.backdrop_path && 
      movie.poster_path &&
      movie.overview
    ) {
      const rate_star = function () {
        let rate = movie.vote_average;
        let count = Math.floor(rate / 2);
        
        return "★ ".repeat(count).trim();
      };
  
      //영화 카드 생성
      const movieCard = document.createElement("div");
      //id 부여, 스타일 적용, 정보 적용
      movieCard.setAttribute("id", movie.id);
      movieCard.setAttribute("class", "card");
      movieCard.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`;
      movieCard.innerHTML = `
        <div class="card_overlay"></div>
        <p>${rate_star()}</p>
        <h3>${movie.title}</h3>
        `;
        //카드 삽입
      movieListContent.append(movieCard);
    }
  });
}



export default renderData