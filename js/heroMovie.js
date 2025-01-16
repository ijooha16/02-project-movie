//상단 헤더 히로
function heroMovie(data) {
  //랜덤 인덱스
  const ranIdx = Math.floor(Math.random() * data.length);

  //영화 정보
  const title = data[ranIdx].title;
  const posterImg = data[ranIdx].backdrop_path;
  const overview = data[ranIdx].overview;

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
  //장르 텍스트로 변환
  const genreIds = data[ranIdx].genre_ids;
  const genreRender = function () {
    return genreIds.map((id) => genreData[id] || "").join(" | ");
  };

  //평점 별로 변경
  const rate = data[ranIdx].vote_average;
  const rate_star = function (rate) {
    let count = Math.floor(rate / 2);
    return "★ ".repeat(count).trim();
  };

  //정보 html에 삽입
  document.querySelector(".hero_d_title").innerText = title;
  document.querySelector(".hero_d_rate").innerText = rate_star(rate);
  document.querySelector(".hero_d_story").innerText = overview;
  document.querySelector(
    "#hero"
  ).style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${posterImg}')`;
  document.querySelector(".hero_d_genre").innerText = genreRender();
}



export default heroMovie