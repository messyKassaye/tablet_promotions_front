import {
    AUTHENTICATION_ERROR,
    LOGIN,
    SHOW_NOTIFICATION,
    SIGN_UP
} from "../stateConstants/actionConstants";

const initialState={
    authenticated:{},
    authenticationError:{},
    notification:{
        isShow:false,
        message:''
    }
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
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                authenticationError: action.payload
            }
        case SHOW_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            }
        default:
            return state
    }
}