//모달 열기
function openModal(data, movieListContent) {
  movieListContent.addEventListener("click", async (card) => {
    const modalContainer = document.querySelector("#modal_container");
    const modalContent = document.querySelector(".modal_content");

    const clickedCard = card.target.closest(".card");
    const movie = (await data).filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];

    const rate_star = function () {
      let count = Math.floor(movie.vote_average / 2);
      return "★ ".repeat(count).trim();
    };

    const date = function() {
      const data = movie.release_date;
      const year = data.slice(0,4)
      let month = data.slice(5,7)
      const day = data.slice(8)

      const mArr = [0, 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      month = mArr[parseInt(month)]

      return `Released on ${day} ${month} ${year}`
    }

    const img = movie.poster_path || movie.backdrop_path;

    modalContainer.classList.remove("hide");
    document.body.style.overflow = "hidden";

    document.querySelector('.modal_id').innerText = movie.id;
    document.querySelector(".modal_date").innerText = date();
    document.querySelector(".modal_title").innerText = movie.title;
    document.querySelector(".modal_overview").innerText = movie.overview;
    document.querySelector(".modal_vote").innerText = rate_star();
    document.querySelector(".modal_count").innerText = `${movie.vote_count} people voted`;

    modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${img})`;

    console.log(clickedCard.id)
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