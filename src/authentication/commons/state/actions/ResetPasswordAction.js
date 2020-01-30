import {RESET_PASSWORD} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_AUTH_URL} from "../../../../constants/constants";
const PATH = 'reset'

export const resetPassword = (data)=>dispatch=>{
    axios.post(`${API_AUTH_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:RESET_PASSWORD,
            payload:res
        }))
}