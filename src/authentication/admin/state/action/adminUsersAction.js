import {FETCH_USERS, STORE_USER} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'users'

export const fetchUsers = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_USERS,
            payload:res.data
        }))
}

export const storeUsers = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_USER,
            payload: res
        }))
}

export const updateUsers = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}`,id)
        .then(response=>response.data)
        .then(res=>dispatch({

        }))
}
