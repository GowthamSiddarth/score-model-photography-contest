import { GET_CONTESTS_FOR_CURRENT_USER } from "../actions/types";

const initialState = {
    contests: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTESTS_FOR_CURRENT_USER:
            return {
                ...state,
                contests: action.payload
            };

        default:
            return state;
    }
}