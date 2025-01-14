import config from "../etc/config.js";
import { getData } from './-getData.js';
import { heroMovie } from './heroMovie.js';
import { renderData } from "./-renderData.js";
import { searchMovies } from './searchMovies.js';
import { openModal, closeModal } from './modals.js';

const popular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const movieListContent = document.querySelector('#movie_list_content');
const input = document.querySelector('#search_input');

// 영화 목록 렌더링
async function renderMovies() {
    const data = await getData(popular);
    for (let idx = 0; idx < data.length; idx++) {
        await renderData(data[idx], idx);
    }
}

// 초기 데이터 및 모달 설정
async function loadMovies() {
    await heroMovie(popular);
    await renderMovies();
}

searchMovies(input, popular);
openModal(movieListContent, popular);
closeModal();

loadMovies();
