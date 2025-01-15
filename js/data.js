import getData from "./-getData.js";

//datas
const datas = {
    trend : await getData('https://api.themoviedb.org/3/trending/movie/day?language=en-US'),
    popular : await getData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"),
}


//   const value = input.value.trim();
//   const search = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-EN&page=1`;
//   const searchData = await getData(search);
//   //error01 함수 안에 있어야만 적용 됨. 왜?

//   let filtered = await searchData.filter((movie) =>
//     movie.title.toLowerCase().includes(value.toLowerCase())
//   );

export default datas