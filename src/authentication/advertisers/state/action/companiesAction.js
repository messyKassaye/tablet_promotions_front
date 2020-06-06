import {FETCH_COMPANIES, STORE_COMPANY, UPDATE_COMPANY} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH= "companies"

export const companyIndex = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_COMPANIES,
            payload:res.data
        }))
}

export const storeCompany = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type: STORE_COMPANY,
            payload:res,
        }))
}

export const updateCompany = (data,id)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_COMPANY,
            payload: res
        }))
}
