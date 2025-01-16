import fetchData from "./-fetchData.js";



//trend data
async function trendData(page) {
  return await fetchData(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`)
}
//popular data
async function popularData(page) {
  return await fetchData(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`)
}
//search data
async function searchData(value) {
  return await fetchData(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-EN&page=1`)
}



export { trendData, popularData, searchData }