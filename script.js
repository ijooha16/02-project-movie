import { apiKey } from "./etc/config.js";



const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const searchUrl = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWIyZjliMmQ0OGRhMTA2NTE3MWUwMzU1OWQ3OGVkYyIsIm5iZiI6MTczNjM0MDI3Ny4yNDQsInN1YiI6IjY3N2U3MzM1NDRkNjQ5ZmZhZTdiMGI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.toCBc4fQg0V2zfy7VZJqgSnQrqF35pPrYzy6cSuJTP8'


//재시작 스크롤 리셋
//logic
window.onload = function() {
    setTimeout(() => {
        window.scrollTo(0,0);
    }, 10)

    console.log('Window succesfully loaded')
};



//로고 클릭 이벤트
//call
const logo = document.querySelector('.logo')
//logic
logo.addEventListener('click', () => {
    window.onload();
})



//api 패치
//logic
async function getData(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey,
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const answer = await response.json();
        return answer.results;

    } catch (error) {
        console.error(error);
        throw error;
    }
}



//영화 카드 렌더
//call
const movieListContent = document.querySelector('#movie_list_content');
//logic
async function renderData(data) {
    //초기화 (for search)
    movieListContent.innerHTML = '';

    //순회
    data.forEach((movie, idx) => {
        let title = movie.title;
        let img = movie.backdrop_path;
        let rate = movie.vote_average;

        //평점 별로 바꾸기
        const rate_star = function (rate) {
            let count = Math.floor(rate / 2);

            return '★ '.repeat(count).trim();
        }

        //영화 카드 삽입
        const movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'card')
        movieCard.setAttribute('id', `card${idx}`)
        movieCard.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${img}')`
        movieCard.innerHTML = `
            <div class="card_overlay"></div>
            <p>${rate_star(rate)}</p>
            <h3>${title}</h3>
            `;

        movieListContent.append(movieCard);
    });
};
//execute
// renderData(popularUrl); //second
//error01
//위에 넣어 부르고, 밑에서 renderData(popularUrl) 로 호출하면 작동안됨
renderData(await getData(popularUrl));



//모달 열기
//call
const modalContainer = document.querySelector('#modal_container');
const modalContent = document.querySelector('.modal_content');
const closeModal = document.querySelector('.close_modal');
//logic
movieListContent.addEventListener('click', async (card) => {
    const data = await getData(popularUrl);
    const clickedCard = card.target.closest('.card');
    const idx = Number(clickedCard.id[4]);
    const target = data[idx];
    
    const rate_star = function () {
        let count = Math.floor(target.vote_average / 2);

        return '★ '.repeat(count).trim();
    }

    modalContainer.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    document.querySelector('.modal_date').innerText = target.release_date;
    document.querySelector('.modal_title').innerText = target.title;
    document.querySelector('.modal_overview').innerText = target.overview;
    document.querySelector('.modal_vote').innerText = rate_star();
    document.querySelector('.modal_count').innerText = target.vote_count;

    modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${target.poster_path})`;
});



//모달 닫기
//logic
closeModal.addEventListener('click', () => {
    modalContainer.classList.add('hide');
    document.body.style.overflow = 'auto';
})



//hero 영화
//logic
async function heroMovie() {
    const data = await getData(popularUrl); //second
    const ranIdx = Math.floor(Math.random()*20);

    //정보
    const title = data[ranIdx].title;
    const posterImg = data[ranIdx].backdrop_path;
    const story = data[ranIdx].overview;
    
    //장르 데이터
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
        37: "Western"
    }
    
    //장르 이름 매칭
    const genreIds = data[ranIdx].genre_ids;
    const genreRender = function() {
        let result = [];

        for (let i=0; i<Object.keys(genreData).length; i++) {
            for (let j=0; j<genreIds.length; j++) {
                if (String(genreIds[j]) == Object.keys(genreData)[i]) {
                    result.push(Object.values(genreData)[i]);
                }
            }
        }
        return result.join(' | ');
    }

    //투표 별
    const rate = data[ranIdx].vote_average;
    const rate_star = function (rate) {
        let count = Math.floor(rate / 2);

        return '★ '.repeat(count).trim();
    }

    //제목, 평점, 내용 render
    document.querySelector('.hero_d_title').innerText = title;
    document.querySelector('.hero_d_rate').innerText = rate_star(rate);
    document.querySelector('.hero_d_story').innerText = story;
    document.querySelector('#hero').style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${posterImg}')`
    document.querySelector('.hero_d_genre').innerText = genreRender();
}
//execute
heroMovie();



//검색 (filter)
//call
const input = document.querySelector('#search_input');
//logic
input.addEventListener('input', async () => {
    const data = await getData(popularUrl);
    
    const value = input.value.trim()
    const filtered = data.filter((movie) => movie.title.toLowerCase().includes(value.toLowerCase()));
    const alert = document.querySelector('.alert');

    // 값이 있을 때와 없을 때 처리
    if (value !== '' && value !== undefined && value) {
        if (filtered.length === 0) {
            alert.classList.remove('hide');
            renderData(filtered);

            window.scrollTo({
                top: 1173,
                left: 0,
                behavior: 'smooth'
              });

            } else {
                alert.classList.add('hide');
                renderData(filtered);

                window.scrollTo({
                    top: 1173,
                    left: 0,
                    behavior: 'smooth'
                });
        }
    } else {
        alert.classList.add('hide');
        renderData(data);

        window.scrollTo({
            top: 1173,
            left: 0,
            behavior: 'smooth'
          });
    }
})
//focus-in logic
input.addEventListener('click', async () => {
            window.scrollTo({
                top: 1173,
                left: 0,
                behavior: 'smooth'
            });
        }
    )








//현재 스크롤 확인
// window.addEventListener('scroll', () => {
//     console.log('Current Scroll Position:', window.scrollY);
//   });


//원하는 url에서 키값 배열 부르는 함수
// async function getData(url, target) {
//     try {
//         const data = await fetchData(url);

//         return data.map((idx) => idx[target])
//     } catch (error) {
//         console.error("Error in titleData:", error);
//         return null;
//     }

//     async function fetchData() {
//         try {
//             const response = await fetch(url, options);
//             if (!response.ok) {
//                 throw new Error("Could not fetch resource");
//             }
//             const answer = await response.json();
//             return answer.results;

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// }

// console.log(await getData(topRated,'title'));







//---SEARCH---
//검색창 이벤트 : 검색창에 영화 타이틀을 검색하면 해당 카드만 보이도록 정렬
//키워드 해당 데이터로 필터링하는 함수
// const filterSearch = async function () {
//     //더보기 버튼 삭제
//     moreBtn.style.display = 'none';
  
//     //search data 렌더링하기
//     const searchValue = searchInput.value.trim();
//     let data = await searchMovie(searchValue);
  
//     //검색 결과 필터링
//     const filteredMovies = data.filter((movie) =>
//       movie.title.includes(searchValue)
//     );
  
//     //기존 카드 제거
//     movieCardWrap.innerHTML = '';
//     //영화 목록 다시 렌더링
//     renderMovie(filteredMovies);
//   };
  
//   //검색키워드 해당 url 변경 + 데이터 불러오는 함수
//   const searchMovie = async function (searchValue) {
//     let searchUrl;
  
//     if (searchValue) {
//       let encodedText = encodeURIComponent(searchValue);
//       searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=false&language=ko-KR&page=1`;
//     }
  
//     const searchData = await fetchMovies(searchUrl);
//     return searchData;
//   };
  
//   //검색 버튼 클릭시 해당 영화 필터링
//   searchBtn.addEventListener('click', async function (event) {
//     const searchValue = searchInput.value.trim();
//     if (searchValue === '') {
//       alert('검색어를 입력해주세요!');
//       return;
//     }
//     //해당 데이터 렌더링
//     await filterSearch(searchValue);
  
//     //검색창 비우기
//     searchInput.value = '';
//     //메인화면 상단으로 이동
//     window.scrollTo({ top: headerHeight, behavior: 'smooth' });
//   });
  
//   //enter키 누를시 해당 영화 필터링
//   searchInput.addEventListener('keypress', async function (event) {
//     const searchValue = searchInput.value.trim();
//     if (event.key === 'Enter') {
//       event.preventDefault();
  
//       if (searchValue === '') {
//         alert('검색어를 입력해주세요!');
//         return;
//       }
  
//       //해당 데이터 렌더링
//       await filterSearch(searchValue);
  
//       //검색창 비우기
//       searchInput.value = '';
//       //메인화면 상단으로 이동
//       window.scrollTo({ top: headerHeight, behavior: 'smooth' });
//     }
//   });