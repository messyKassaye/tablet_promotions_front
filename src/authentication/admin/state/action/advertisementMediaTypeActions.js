import {
    FETCH_ADVERT_MEDIA_TYPE,
    STORE_ADVERT_MEDIA_TYPE,
    UPDATE_ADVERT_MEDIA_TYPE
} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH = 'advertisement_media'

export const fetchAdvertMediaType = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ADVERT_MEDIA_TYPE,
            payload: res.data
        }))
}

export const updateAdvertMedia = (data,id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_ADVERT_MEDIA_TYPE,
            payload:res
        }))
}

export const storeAdvertMedia = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_ADVERT_MEDIA_TYPE,
            payload:res
        }))
}
