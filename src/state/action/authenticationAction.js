import {AUTHENTICATION_ERROR, LOGIN, SIGN_UP} from "../stateConstants/actionConstants";
import {API_AUTH_URL} from "../../constants/constants";
import {set} from "../../TokenService";

export const signUp = postData => dispatch => {
    fetch(`${API_AUTH_URL}signup`, {
        method: 'POST',
        headers: {
            'content-type': 'Application/json'
        },
        body: postData
    }).then(res => res.json())
        .then(response => {
            if(response.status){
                set(response.token)
                dispatch({
                    type: SIGN_UP,
                    payload: response
                })
            }else {
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: response
                })
            }
        })
}

export const login = postData => dispatch => {
    fetch(`${API_AUTH_URL}login`, {
        method: 'POST',
        headers: {
            'content-type': 'Application/json'
        },
        body: postData
    }).then(res => res.json())
        .then(response => {
            if (response.status) {
                set(response.token)
                dispatch({
                    type: LOGIN,
                    payload: response
                })
            } else {
                dispatch({
                    type: AUTHENTICATION_ERROR,
                    payload: response
                })
            }
        })
}