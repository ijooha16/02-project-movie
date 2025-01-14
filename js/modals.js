import { getData } from './-getData.js';

// 모달 열기
export function openModal(movieListContent, popular) {
    movieListContent.addEventListener('click', async (card) => {
        const modalContainer = document.querySelector('#modal_container');
        const modalContent = document.querySelector('.modal_content');

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

        const posterImg = target.poster_path || 'default_image.jpg';
        modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${posterImg})`;
    });
}

// 모달 닫기
export function closeModal() {
    const modalContainer = document.querySelector('#modal_container');
    const closeModal = document.querySelector('.close_modal');

    if (modalContainer && closeModal) {
        closeModal.addEventListener('click', () => {
            modalContainer.classList.add('hide');
            document.body.style.overflow = 'auto';
        });
    }
}

export default closeModal