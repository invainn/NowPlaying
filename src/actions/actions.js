import axios from 'axios';

export const FETCH_MOVIES = 'FETCH_MOVIES';

export function fetchMovieList() {
    return async (dispatch) => {
        try {
            let req = await axios.get(process.env.NOW_PLAYING || `http://localhost:3000/nowplaying`);

            dispatch({type: FETCH_MOVIES, payload: req});
        } catch(e) {
            // need to dispatch error here
        }
    };
}