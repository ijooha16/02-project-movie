import renderData from "./-renderData.js";



const movieListContent = document.querySelector("#movie_list_content");
const moreBtn = document.querySelector('.more_btn');



// 검색 (filter)
async function searchFunct(input, filtered, dataTrend) {
  movieListContent.innerHTML = ''
  
  const value = input.value.trim();
  const alert = document.querySelector(".alert");
  
  // // 값이 있을 때와 없을 때 처리
  if (value && value !== '') { //값 있을 때
    if (await filtered.length === 0) { //결과 없음
      moreBtn.classList.add('hide')
      alert.classList.remove("hide");
      renderData([], movieListContent);
    } else { //결과 있음
      moreBtn.classList.add('hide')
      alert.classList.add("hide");
      renderData(await filtered, movieListContent);
    }
  } else { //값 없을 때
    moreBtn.classList.remove('hide')
    alert.classList.add("hide");
    renderData(await dataTrend, movieListContent);
  }
  
  window.scrollTo({
    top: 1173,
    left: 0,
    behavior: "smooth",
  });

  // focus-in logic
  input.addEventListener("click", async () => {
    window.scrollTo({
      top: 1173,
      left: 0,
      behavior: "smooth",
    });
  });
}



export default searchFunct;