// 모달 열기
// function openModal(data, movieListContent) {
//     movieListContent.addEventListener("click", (card) => {
//       const modalContainer = document.querySelector("#modal_container");
//       const modalContent = document.querySelector(".modal_content");
  
      
//       const clickedCard = card.target.closest(".card");
//       const movie = data.filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];
  
      
//       const rate_star = function () {
//         let count = Math.floor(movie.vote_average / 2);
//         return "★ ".repeat(count).trim();
//       };
  
//       modalContainer.classList.remove("hide");
//       document.body.style.overflow = "hidden";
  
//       document.querySelector(".modal_date").innerText = movie.release_date;
//       document.querySelector(".modal_title").innerText = movie.title;
//       document.querySelector(".modal_overview").innerText = movie.overview;
//       document.querySelector(".modal_vote").innerText = rate_star();
//       document.querySelector(".modal_count").innerText = movie.vote_count;
  
//       modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;

//     });
//   }
  










////////////////test
function openModalFunct (movie) {
      const modalContainer = document.querySelector("#modal_container");
      const modalContent = document.querySelector(".modal_content");
  
      
      // const clickedCard = card.target.closest(".card");
      // const movie = data.filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];
  
      
      const rate_star = function () {
        let count = Math.floor(movie.vote_average / 2);
        return "★ ".repeat(count).trim();
      };
  
      modalContainer.classList.remove("hide");
      document.body.style.overflow = "hidden";
  
      document.querySelector(".modal_date").innerText = movie.release_date;
      document.querySelector(".modal_title").innerText = movie.title;
      document.querySelector(".modal_overview").innerText = movie.overview;
      document.querySelector(".modal_vote").innerText = rate_star();
      document.querySelector(".modal_count").innerText = movie.vote_count;
  
      modalContent.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`;
}
///////////////////test










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
  
// export { openModal, closeModal };
export { openModalFunct, closeModal };//test