import {STORE_BASE64} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'base64'

export const storeBase64 = (data)=>dispatch=>{
    console.log('action')
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_BASE64,
            payload:res
        }))
}
