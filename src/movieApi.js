import axios from 'axios';

// api call from movies.json file
export function GetMovies() {
    return axios.get('./movies.json')
    .catch(function (error) {
        console.log(error);
      });
}