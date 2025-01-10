import config from "./etc/config.js";

const movieListContent = document.querySelector('#movie_list_content');
const cards = document.querySelector('.cards')


const apiKey = config.apiKey;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: apiKey,
    }
};

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';


//원본
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

//results로
// async function getTitle(idx) {
//     try {
//         const data = await fetchData(topRated);
//         return data.results[idx].title;
//     } catch (error) {
//         console.error("Error in titleData:", error);
//         return null;
//     }
// }

// async function renderTitle(idx) {
//     const title = await getTitle(idx);
//     console.log(title);

//     document.querySelector('#test').innerHTML = `
//     <p>${title}</p>`
// }

//영화 정보 가져오기
// const renderMovie = async function () {
//     const data = await getMovies();

//     data.forEach((movie) => {
//       let title = movie.title;
//       let posterImg = movie.backdrop_path;
//       let rate = movie.vote_average;

//       const movieCard = document.createElement('div');
//       movieCardWrap.append(movieCard);

//       movieCard.setAttribute('class', 'movie_card');
//       movieCard.innerHTML = `
//       <img src='https://image.tmdb.org/t/p/w500${posterImg}' alt='${title} image'>
//       <h3>${title}</h3>
//       <p>${rate}</p>
//       `;
//     });
//   };




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



// 영화 정보 가져오기
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

renderData();