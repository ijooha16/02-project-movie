import renderData from "./renderData.js";
import { openModal, closeModal } from "./modalOpenClose.js";
import { searchData } from "./movieData.js";



async function bookMarkSave(cardId, bookMark, movieListContent) {
    const getBData = JSON.parse(localStorage.getItem('Bookmarked')) || document.querySelector('.alert').classList.remove('hide');
    
    const element = document.querySelector(".modal_content")
    const style = window.getComputedStyle(element);
  
    const modalImg = style.backgroundImage;
    const modalId = document.querySelector(".modal_id").textContent;
    const modalTitle = document.querySelector(".modal_title").textContent;
    const modalDate = document.querySelector(".modal_date").textContent;
    const modalOverview = document.querySelector(".modal_overview").textContent;
    const modalVote = document.querySelector(".modal_vote").textContent;
    const modalCount = document.querySelector(".modal_count").textContent;
  
    //이미지 변환
    const img = function() {
      const img = modalImg;
      let url = img.slice(37,img.length-2)
      return `${url}`;
    }
    
    //평점 변환
    const rate = function () {
      const vote = parseFloat(modalVote.length);
      let count = Math.floor((vote / 2 + 1) * 2);
      return count;
    };

    console.log(rate())
  
    //vote count 변환
    const count = function() {
      return parseInt(modalCount, 10)
    }

    //date 변환
    const date = function() {
        const rdata = modalDate;
        const year = rdata.slice(19)
        let month = rdata.slice(15,18)
        const day = rdata.slice(12,14)
        
        const mArr = [0, 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        month  = String(mArr.indexOf(month))

        return `${year}-${month}-${day}`
    }

    if (getBData.some(movie => movie.title === modalTitle)) { //데이터가 이미 있으면
        bookMark.style.backgroundImage = "url('./src/icon_heart_fill.png')";
        const updatedData = getBData.filter(movie => {
            return movie.title !== modalTitle;
        });
        localStorage.setItem('Bookmarked', JSON.stringify(updatedData))

        if (document.querySelector('#movie_list_text').textContent === 'Bookmark') {
            console.log(`updated data ====> ${updatedData}`)
            movieListContent.innerHTML = ''
            renderData(updatedData,movieListContent)
        }

    } else { //새로운 데이터일 때
        bookMark.style.backgroundImage = "url('./src/icon_heart_empty.png')";
        getBData.push({
            bookmark : true,
            id : modalId,
            backdrop_path : img(),
            poster_path : img(),
            title : modalTitle,
            release_date : date(),
            overview : modalOverview,
            vote_average : rate(),
            vote_count : count(),
        })
        localStorage.setItem('Bookmarked', JSON.stringify(getBData))
    }
    console.log(getBData)
    openModal(cardId, bookMark, movieListContent)
}



//북마크 확인
function bookMarkFunct(moreBtn, movieListContent) {
    movieListContent.innerHTML = ''

    moreBtn.classList.add('hide')
    document.querySelector(".alert").classList.add("hide");

    window.scrollTo({
        top: 1173,
        left: 0,
        behavior: "smooth",
    });
}



export { bookMarkSave, bookMarkFunct }