import {COMMON_SHOW_ADVERT, COMMON_STORE_ADVERT} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {ADMIN_API_URL, API_URL} from "../../../../constants/constants";
import {SHOW_ADMIN_ADVERT} from "../../../admin/state/actionConstants/adminActionConstants";

const PATH = 'adverts'

export const commonStoreAdvert = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_STORE_ADVERT,
            payload:res
        }))
}

export const commonShowAdvert = id=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_SHOW_ADVERT,
            payload:res.data
        }))
}
