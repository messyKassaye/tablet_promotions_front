import {FETCH_CURRENCY, STORE_CURRENCY, UPDATE_CURRENCY} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH='currencies'

export const fetchCurrency = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_CURRENCY,
            payload:res.data
        }))
}

export const storeCurrency = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_CURRENCY,
            payload:res
        }))
}

export const updateCurrency = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_CURRENCY,
            payload:res
        }))
}
