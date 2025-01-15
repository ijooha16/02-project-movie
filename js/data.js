import getData from "./-getData.js";

//datas
const datas = {
    trend : await getData('https://api.themoviedb.org/3/trending/movie/day?language=en-US'),
    popular : await getData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"),
}

export default datas