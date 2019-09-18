import {LOGIN, SIGN_UP} from "../stateConstants/actionConstants";
import {API_AUTH_URL} from "../../constants/constants";

export const signUp = postData=>dispatch=>{
    fetch(`${API_AUTH_URL}signup`,{
        method:'POST',
        headers:{
            'content-type':'Application/json'
        },
        body:postData
    }).then(res=>res.json())
        .then(response => dispatch({
            type: SIGN_UP,
            payload: response
        }))
}

export const login = postData=>dispatch=>{
    fetch(`${API_AUTH_URL}login`,{
        method:'POST',
        headers:{
            'content-type':'Application/json'
        },
        body:postData
    }).then(res=>res.json())
        .then(response => {
            localStorage.setItem('token',response.token)
            dispatch({
                type: LOGIN,
                payload: response
            })
        })
}