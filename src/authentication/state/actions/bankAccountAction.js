import {BANK_ACCOUNT_FETCH, DELETE_BANK} from "../authConstants/authConstants";
import {STORE_BANK} from "../authConstants/authConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
const PATH = 'bank_accounts'
export const bankAccountFetch = ()=>dispatch=>{
    axios.get(`${API_URL}bank_accounts`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:BANK_ACCOUNT_FETCH,
            payload:res.data
        }))
}

export const storeBank = (data)=>dispatch=>{
    axios.post(`${API_URL}bank_accounts`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_BANK,
            payload: res
        }))

}

export const deleteBank = (id)=>dispatch=>{
    axios.delete(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:DELETE_BANK,
            payload:res
        }))
}