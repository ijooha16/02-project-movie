import { getData } from './-getData.js';
import { renderData } from './-renderData.js';

// 검색 (filter)
export async function searchMovies(input, popular, movieListContent) {
    input.addEventListener('input', async () => {
        const data = await getData(popular);
        const value = input.value.trim();
        const filtered = data.filter((movie) => movie.title.toLowerCase().includes(value.toLowerCase()));
        const alert = document.querySelector('.alert');

        // 값이 있을 때와 없을 때 처리
        if (value !== '') {
            if (filtered.length === 0) {
                alert.classList.remove('hide');
                renderData([], 0, movieListContent);
            } else {
                alert.classList.add('hide');
                renderData(filtered, 0, movieListContent);
            }
        } else {
            alert.classList.add('hide');
            renderData(data, 0, movieListContent);
        }

        window.scrollTo({
            top: 1173,
            left: 0,
            behavior: 'smooth'
        });
    });

    // focus-in logic
    input.addEventListener('click', async () => {
        window.scrollTo({
            top: 1173,
            left: 0,
            behavior: 'smooth'
        });
    });
}
