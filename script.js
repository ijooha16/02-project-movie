const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWIyZjliMmQ0OGRhMTA2NTE3MWUwMzU1OWQ3OGVkYyIsIm5iZiI6MTczNjM0MDI3Ny4yNDQsInN1YiI6IjY3N2U3MzM1NDRkNjQ5ZmZhZTdiMGI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.toCBc4fQg0V2zfy7VZJqgSnQrqF35pPrYzy6cSuJTP8'
    }
  };

// fetch ('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Could not fetch resource");
//         }
//         return response.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


async function fetchData() {
    try {

        const movieTitle = document.querySelector("search").value.toLowerCase();
        const response = await fetch ('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);

        if (!response.ok) {
            throw new Error ("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);
    }
    catch(error) {
        console.error(error);
    }
}