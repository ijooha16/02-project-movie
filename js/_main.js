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



//북마크 버튼
const bookMark = document.querySelector('.like_modal');
let bookMarkList = [];

//즐겨찾기 추가
bookMark.addEventListener('click', function () {
  const getBData = JSON.parse(localStorage.getItem('Bookmarked'));
  
  //북마크 리셋
  
  //북마크 이미지 변경
  bookMark.style.backgroundImage = "url('./src/icon_heart_empty.png')";

  const element = document.querySelector(".modal_content")
  const style = window.getComputedStyle(element);

  const modalImg = style.backgroundImage;
  const modalTitle = document.querySelector(".modal_title").textContent;
  const modalDate = document.querySelector(".modal_date").textContent;
  const modalOverview = document.querySelector(".modal_overview").textContent;
  const modalVote = document.querySelector(".modal_vote").textContent;
  const modalCount = document.querySelector(".modal_count").textContent;

  //이미지 변환
  const img = function() {
    const img = modalImg;
    let url = img.slice(37,img.length)
    return `${url}`;
  }

  //평점 변환
  const rate = function () {
    const vote = parseFloat(modalVote.length);
    let count = Math.floor(vote * 2 + 1);
    return count;
  };

  //vote count 변환
  const count = function() {
    return parseInt(modalCount, 10)
  }

  if (getBData.some(movie => movie.title === modalTitle)) {
    alert('This movie is already in bookmark!');
  } else {
      bookMarkList.push({
        backdrop_path : img(),
        title : modalTitle,
        release_date : modalDate,
        overview : modalOverview,
        vote_average : rate(),
        vote_count : count(),
      })
  }
  localStorage.setItem('Bookmarked', JSON.stringify(bookMarkList))
})



//북마크 확인
document.querySelector('.book_mark_btn').addEventListener('click', () => {
  const getBData = JSON.parse(localStorage.getItem('Bookmarked'));
  let arr =[];

  for (let i=0; i<getBData.length; i++) {
    arr.push(getBData[i])
  }
  
  movieListContent.innerHTML = ''

  moreBtn.classList.add('hide')
  document.querySelector(".alert").classList.add("hide");
  
  renderData(arr, movieListContent);
  openModal(arr, movieListContent);

  console.log(arr)
  
  window.scrollTo({
    top: 1173,
    left: 0,
    behavior: "smooth",
  });

  console.log(getBData)
})

