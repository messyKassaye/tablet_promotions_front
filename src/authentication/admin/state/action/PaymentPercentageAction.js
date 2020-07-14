import {PAYMENT_PERCENTAGE,UPDATE_PAYMENT_PERCENTAGE} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH = 'payment_percentage'
export const fetchPaymentPercentage = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:PAYMENT_PERCENTAGE,
            payload:res
        }))
}

export const updatePaymentPercentage = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_PAYMENT_PERCENTAGE,
            payload:res
        }))
}