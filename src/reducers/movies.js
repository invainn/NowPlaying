import {
    FETCH_MOVIES,
} from '../actions/actions';

export default (state = {movies: []}, action) => {
    switch(action.type) {
        case FETCH_MOVIES:
            return { ...state, movies: action.payload.data.results };
        default: 
            return state;
    }
}