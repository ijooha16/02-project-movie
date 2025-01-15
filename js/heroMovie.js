function heroMovie(data) {
    const ranIdx = Math.floor(Math.random() * data.length);
  
    // 영화 정보
    const title = data[ranIdx].title;
    const posterImg = data[ranIdx].backdrop_path || "default_image.jpg";
    const story = data[ranIdx].overview;
  
    // 장르 매핑
    const genreData = {
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      28: "Action",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "ScienceFiction",
      10770: "TVMovie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
  
    const genreIds = data[ranIdx].genre_ids;
    const genreRender = function () {
      return genreIds.map((id) => genreData[id] || "").join(" | ");
    };
  
    // 평점 별
    const rate = data[ranIdx].vote_average;
    const rate_star = function (rate) {
      let count = Math.floor(rate / 2);
      return "★ ".repeat(count).trim();
    };
  
    // HTML 요소에 값 설정
    document.querySelector(".hero_d_title").innerText = title;
    document.querySelector(".hero_d_rate").innerText = rate_star(rate);
    document.querySelector(".hero_d_story").innerText = story;
    document.querySelector(
      "#hero"
    ).style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${posterImg}')`;
    document.querySelector(".hero_d_genre").innerText = genreRender();
  }
  
  export default heroMovie