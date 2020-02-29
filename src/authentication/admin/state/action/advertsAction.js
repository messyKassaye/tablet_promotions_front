import {FETCH_ADVERTS, SHOW_ADMIN_ADVERT, UPDATE_ADVERT} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH = 'adverts'

export const fetchAdverts = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ADVERTS,
            payload:res.data
        }))
}

export const updateAdvert = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_ADVERT,
            payload: res
        }))
}

export const showAdverts = (id)=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:SHOW_ADMIN_ADVERT,
            payload:res.data
        }))
}
