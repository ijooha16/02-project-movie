import config from "../etc/config.js";

//api 패치

export async function getData(url) {
    const apiKey = config.apiKey;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey,
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const answer = await response.json();
        console.log(answer);
        return answer.results;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getData