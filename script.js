import config from "./etc/config.js";

const movieListContent = document.querySelector('#movie_list_content');

const apiKey = config.apiKey;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: apiKey,
    }
};

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

//api 패치 함수
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



//(시작화면) 영화 정보 가져오기
const renderData = async function () {
    const data = await getData(topRated);

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

//execute


// random hero movie
const heroMovie = async function () {
    const data = await getData(topRated);
    const ranIdx = Math.floor(Math.random()*20);

    //정보
    const title = data[ranIdx].title;
    const posterImg = data[ranIdx].backdrop_path;
    const story = data[ranIdx].overview;
    
    //장르 데이터
    const genreData = {
        Adventure       :12,
        Animation       :16,
        Comedy          :35,
        Action          :28,
        Crime           :80,
        Documentary     :99,
        Drama           :18,
        Family          :10751,
        Fantasy         :14,
        History         :36,
        Horror          :27,
        Music           :10402,
        Mystery         :9648,
        Romance         :10749,
        ScienceFiction :878,
        TVMovie        :10770,
        Thriller        :53,
        War             :10752,
        Western         :37,
    }
    
    //장르 이름 매칭, render
    const genreId = data[ranIdx].genre_ids;
    const genreRender = function(genre) {
        let result = '';

        for (let i=0; i<genreId.length; i++) {
            for (let j=0; j<genreId.length; j++) {
                if (genre[j] === Object.values(genreData)[i]) {
                    result.push(Object.keys(genreData)[i]);
                }
            }
        }
        document.querySelector('#hero_d_genre').innerText = result.join(' | ');
    }

    //투표 별
    const rate = data[ranIdx].vote_average;
    const rate_star = function (rate) {
        let count = Math.floor(rate / 2);

        return '★'.repeat(count);
    }

    console.log(title)
    //제목, 평점, 내용 render
    document.querySelector('.hero_d_title').innerText = title;
    document.querySelector('.hero_d_rate').innerText = rate_star(rate);
    document.querySelector('.hero_d_story').innerText = story;
    document.querySelector('#hero').style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${posterImg}')`
}

//execute
//시작화면 뮤비카드
renderData();
//hero화면 랜덤 뮤비
heroMovie();
