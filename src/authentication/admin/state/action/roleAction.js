import {FETCH_ROLE, STORE_ROLE, UPDATE_ROLE} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'roles'
export const fetchRole = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ROLE,
            payload:res.data
        }))
}

export const updateRole = (id,data)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_ROLE,
            payload:res
        }))
}

export const storeRole = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type: STORE_ROLE,
            payload: res
        }))
}
