import {COMMON_PER_PLAY_PAYER} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'advert_checker'
export const fetchCheckedAdvert = (role)=>dispatch=>{
axios.get(`${API_URL}${role}/${PATH}`)
    .then(response=>response.data)
    .then(res=>dispatch({
        type:COMMON_PER_PLAY_PAYER,
        payload:res.data
    }))
}