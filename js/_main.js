import { trendData, popularData, searchData } from "./-movieData.js";
import heroMovie from "./heroMovie.js";
import renderData from "./-renderData.js";
import searchFunct from "./searchFunct.js";
import { openModal, closeModal } from "./modalOpenClose.js";



//html 불러오기
const movieListContent = document.querySelector("#movie_list_content");
const moreBtn = document.querySelector('.more_btn');
const input = document.querySelector("#search_input");
const footerLogo = document.querySelector('#footer_logo');
const nanvLogo = document.querySelector('#nav_logo');
let page = 1;



//시작 execution
window.onload = async function() {
  const dataTrend = await trendData(1)
  
  //스크롤 리셋
  setTimeout(() => {
      window.scrollTo(0,0);
  }, 10)

  //시작화면 영화, 모달
  renderData(dataTrend, movieListContent);
  closeModal();
  openModal(dataTrend, movieListContent);

  // let page = 1;
  //더보기 버튼
  moreBtn.addEventListener('click', async() => {
    page++
    renderData(await trendData(page), movieListContent)
    openModal(await trendData(page), movieListContent)
  });
  
  //로고 클릭 이벤트
  footerLogo.addEventListener('click', () => {
    window.location.reload();
  });
  nanvLogo.addEventListener('click', () => {
    window.location.reload();
  });
};



//사이트 상단 랜덤 영화 애니메이션
setTimeout( async() => {
  setInterval( async() => {
    const dataTrend = await trendData(1);
    heroMovie(dataTrend);
  }, 5000)
  heroMovie(await trendData(1));
}, 200);




//검색
input.addEventListener('input', async () => {
  const value = input.value.trim();
  await searchData(value);

  const filtered = (await searchData(value)).filter((movie) =>
    movie.title.toLowerCase().includes(value.toLowerCase())
  );
  const dataTrend = await trendData(1)
  
  searchFunct(input, moreBtn, movieListContent, filtered, dataTrend, page, value);

  // //모달 열기
  openModal(await filtered, movieListContent)
});