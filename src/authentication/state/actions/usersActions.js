import {
    DELETE_ADVERT_LOCALLY,
    ME, PUSH_NEW_COMPANY_LOCALLY,
    STORE_NEW_ADVERT_LOCALLY,
    UPDATE_USER
} from "../authConstants/authConstants";
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

export const storeNewAdvertLocally = (advert)=>dispatch=>{
    dispatch({
        type:STORE_NEW_ADVERT_LOCALLY,
        payload:advert
    })
}

export const deleteAdvertLocally = (id)=>dispatch=>{
    dispatch({
        type: DELETE_ADVERT_LOCALLY,
        payload:id
    })
}

export const addNewCompanyLocally = (data)=>dispatch=>{
    dispatch({
        type: PUSH_NEW_COMPANY_LOCALLY,
        payload:data
    })
}
