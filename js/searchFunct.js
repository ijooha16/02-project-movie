import datas from './data.js';
import renderData from './-renderData.js'


const addBtn = document.querySelector('.add_btn')


// 검색 (filter)
async function searchFunct(input, value, filtered, movieListContent) {
    const alert = document.querySelector(".alert");
    // 값이 있을 때와 없을 때 처리

  if (filtered.length === 0) {
    if (input.value) {
      alert.classList.remove("hide");
      renderData(filtered, movieListContent);
    } else {
      addBtn.classList.add('hide')
      alert.classList.add("hide");
      filtered = await datas.popular;
    }
  } else {
    addBtn.classList.add('hide')
    alert.classList.add("hide");
    renderData(filtered, movieListContent);
  }

  renderData(filtered, movieListContent);

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