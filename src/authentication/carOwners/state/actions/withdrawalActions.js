import {STORE_WITHDRAWAL, WITHDRAWAL_FETCH} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
export const  withdrawalFetch = ()=>dispatch=>{
    axios.get(`${API_URL}withdrawals`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:WITHDRAWAL_FETCH,
            payload:res.data
        }))
}

export const withdrawalStore = (data)=>dispatch=>{
    axios.post(`${API_URL}withdrawals`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type: STORE_WITHDRAWAL,
            payload: res
        }))
}