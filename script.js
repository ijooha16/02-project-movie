import config from "./etc/config.js";

const apiKey = config.apiKey;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey,
    }
  };

const topRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

async function fetchData(url) {
    try {

        const response = await fetch (url, options);

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

fetchData(topRated);