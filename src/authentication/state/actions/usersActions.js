import {ME, UPDATE_USER} from "../authConstants/authConstants";
import axios from 'axios'
import {API_AUTH_URL, API_URL} from "../../../constants/constants";

const PATH ='users'
export const me = ()=>dispatch=>{
    axios.get(`${API_AUTH_URL}me`)
        .then(response => response.data)
        .then(res =>dispatch({
            type:ME,
            payload: res.data
        }))
}

export const userUpdate = (data,id)=>dispatch=>{

    axios.put(`${API_URL}users/${id}`,data,{
        headers: {
            'content-type': 'Application/json'
        },
    })
        .then(response=>response.data)
        .then(res=>dispatch({
            type: UPDATE_USER,
            payload: res.data
        }))
}