import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !isEmpty(action.payload)
            };

        case USER_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}