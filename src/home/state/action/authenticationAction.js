import {
    AUTHENTICATION_ERROR,
    LOGIN,
    PROMPT_TO_SIGN,
    SHOW_NOTIFICATION,
    SIGN_UP
} from "../stateConstants/actionConstants";
import {API_AUTH_URL} from "../../../constants/constants";
import axios from 'axios'

import {set, setRole} from "../../../TokenService";

export const signUp = postData => dispatch => {
    axios.post(`${API_AUTH_URL}signup`,postData,{
        headers:{
            'content-type':'Application/json'
        }
    })
        .then((res)=>res.data)
        .then((response)=>{
            if(response.status){
                set(response.token)
                setRole(JSON.stringify(response.role))
                this.props.go('Authenticated')
                dispatch({
                    type: SIGN_UP,
                    payload: response
                })
            }
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: response
            })
        })
}

export const login = postData => dispatch => {
    axios.post(`${API_AUTH_URL}login`,postData,{
        headers:{
        'content-type':'Application/json'
        }})
        .then((res)=>res.data)
        .then((response)=>{
            if (response.status) {
                set(response.token)
                setRole(JSON.stringify(response.role))
                dispatch({
                    type: LOGIN,
                    payload: response
                })
            }
            dispatch({
                type: AUTHENTICATION_ERROR,
                payload: response
            })
        })
}

export const promptToSignIn = ()=>dispatch=>{
    dispatch({
        type:PROMPT_TO_SIGN,
        payload:{message:'Your are not allowed to sign in'}
    })
}

export const showNotifications = messageData=>dispatch=>{
    console.log('Hi there')
    dispatch({
        type:SHOW_NOTIFICATION,
        payload:messageData
    })
}