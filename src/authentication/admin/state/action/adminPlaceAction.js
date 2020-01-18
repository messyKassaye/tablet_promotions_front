import {STORE_PLACES, FETCH_PLACES, UPDATE_PLACES} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'places'

export const fetchPlaces = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_PLACES,
            payload: res.data
        }))
}
export const storePlaces = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_PLACES,
            payload:res
        }))
}

export const updatePlaces = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_PLACES,
            payload:res
        }))
}