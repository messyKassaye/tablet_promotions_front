import {LOGIN, SIGN_UP} from "../stateConstants/actionConstants";

const initialState={
    authenticated:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                status: action.payload
            }
        case LOGIN:
            return {
                ...state,
                authenticated: action.payload
            }
        default:
            return state
    }
}