import { trendData, popularData, searchData } from "./-movieData.js";



//모달 열기
async function openModal(bookMark, movieListContent) {
  movieListContent.addEventListener("click", async (card) => {
    const modalContainer = document.querySelector("#modal_container");
    const modalContent = document.querySelector(".modal_content");
    const local = JSON.parse(localStorage.getItem('Bookmarked')) || [];
    
    const clickedCard = card.target.closest(".card");
    const h3Element = clickedCard.querySelector('h3'); // clickedCard 내부의 title
    const value = h3Element.textContent;
    const movie = (await searchData(value)).filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];

    if (!movie) return;
    
    const rate_star = () => "★ ".repeat(Math.floor(movie.vote_average / 2)).trim();

    const date = () => {
      const [year, month, day] = movie.release_date.split('-');
      const mArr = [0, 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      return `Released on ${day} ${mArr[parseInt(month)]} ${year}`
    }

    modalContainer.classList.remove("hide");
    document.body.style.overflow = "hidden";

    bookMark.style.backgroundImage = local.some(data => data.title === movie.title)
      ? "url('./src/icon_heart_empty.png')"
      :  "url('./src/icon_heart_fill.png')";

    document.querySelector('.modal_id').innerText = movie.id;
    document.querySelector(".modal_date").innerText = date();
    document.querySelector(".modal_title").innerText = movie.title;
    document.querySelector(".modal_overview").innerText = movie.overview;
    document.querySelector(".modal_vote").innerText = rate_star();
    document.querySelector(".modal_count").innerText = `${movie.vote_count} people voted`;

    modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;

    return clickedCard.id;
  });
}



// 모달 닫기
function closeModal() {
  const modalContainer = document.querySelector("#modal_container");
  const closeModal = document.querySelector(".close_modal");

  if (modalContainer && closeModal) {
    closeModal.addEventListener("click", () => {
      modalContainer.classList.add("hide");
      document.body.style.overflow = "auto";
    });
  }
}



export { openModal, closeModal }