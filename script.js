import config from "./etc/config.js";



//api 패치
//call
const popular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
//logic
async function getData(url) {
    const apiKey = config.apiKey;
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
    // const data = await getData(popular);
    //error01
    //안에 삽입, argument 삭제하면 작동 안됨

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
// renderData(popular); //second
//error01
//위에 넣어 부르고, 밑에서 renderData(popular) 로 호출하면 작동안됨
renderData(await getData(popular));



//모달 열기
//call
const modalContainer = document.querySelector('#modal_container');
const modalContent = document.querySelector('.modal_content');
const closeModal = document.querySelector('.close_modal');
//logic
movieListContent.addEventListener('click', async (card) => {
    const data = await getData(popular);
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
    const data = await getData(popular); //second
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
    const data = await getData(popular);
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
window.addEventListener('scroll', () => {
    console.log('Current Scroll Position:', window.scrollY);
  });


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