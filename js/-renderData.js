//영화 카드 렌더
export async function renderData(data, idx, movieListContent) {
    let title = data.title;
    let img = data.backdrop_path;
    let rate = data.vote_average;

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
};

export default renderData