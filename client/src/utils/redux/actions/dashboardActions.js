import axios from 'axios';
import { GET_ERRORS, GET_CONTESTS_FOR_CURRENT_USER } from "./types";

export const getContestsForUser = (userData) => dispatch => {
    axios.post('/api/v1.0/users/get-contests', userData)
        .then(res => dispatch({
            type: GET_CONTESTS_FOR_CURRENT_USER,
            payload: res.data.contests
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}