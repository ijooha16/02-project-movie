import config from "./etc/config.js";

const movieListContent = document.querySelector('#movie_list_content');
const input = document.querySelector('#search_input');

const apiKey = config.apiKey;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: apiKey,
    }
};

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

//api 패치
async function getData(url) {
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

//(시작화면) 영화 render
async function renderData(data) {
    movieListContent.innerHTML = '';

    // const data = await getData(topRated);

    data.forEach((movie) => {
        let title = movie.title;
        let posterImg = movie.backdrop_path;
        let rate = movie.vote_average;

        const rate_star = function (rate) {
            let count = Math.floor(rate / 2);

            return '★'.repeat(count);
        }

        const movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'cards')

        movieCard.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${posterImg}')`

        movieCard.innerHTML = `
      <p>${rate_star(rate)}</p>
      <h3>${title}</h3>
      <div class="card_overlay"></div>
      `;

        movieListContent.append(movieCard);
    });
};

// random hero movie
async function heroMovie() {
    const data = await getData(topRated);
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

        return '★'.repeat(count);
    }

    //제목, 평점, 내용 render
    document.querySelector('.hero_d_title').innerText = title;
    document.querySelector('.hero_d_rate').innerText = rate_star(rate);
    document.querySelector('.hero_d_story').innerText = story;
    document.querySelector('#hero').style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${posterImg}')`
    document.querySelector('.hero_d_genre').innerText = genreRender();

}

//필터링 (검색)
input.addEventListener('input', async () => {
    const data = await getData(topRated);
    console.log(data)
    const value = document.querySelector('#search_input').value.trim();
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









//execute

//시작할때 뮤비카드 render
renderData(await getData(topRated));
//hero화면 랜덤 뮤비
heroMovie();



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