import {FETCH_ROLE} from "../stateConstants/actionConstants";
import {API_URL} from '../../../constants/constants'
import axios from 'axios'
export const fetchRole =()=>dispatch=>{
    axios.get(`${API_URL}roles`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ROLE,
            payload:res
        }))
}