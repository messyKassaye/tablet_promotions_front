import {CAR_CATEGORY_STORE, FETCH_CARS_CATEGORY, UPDATE_CAR_CATEGORY} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH= 'categories'

export const fetchCarCategory = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_CARS_CATEGORY,
            payload: res.data
        }))
}
export const storeCarCategory = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:CAR_CATEGORY_STORE,
            payload:res
        }))
}

export const updateCarCategory = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_CAR_CATEGORY,
            payload:res
        }))
}
