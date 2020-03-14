import {SET_PLACE} from "../actionConstants/DownloaderConstant";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'address'
export const setPlace =  (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:SET_PLACE,
            payload:res
        }))
}