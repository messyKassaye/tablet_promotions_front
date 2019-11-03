import {STORE_ADVERT, ADVERT_STATUS, DELETE_ADVERT} from "../constants/advertConstants";
import {SHOW_ADVERT} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH='adverts'
export const storeAdvert = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data,{
        headers: {
            'content-type': 'Application/json'
        },
    })
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_ADVERT,
            payload:res
        }))

}

export const show = (id)=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:SHOW_ADVERT,
            payload:res.data
        }))
}

export const deleteAdvert = (id)=>dispatch=>{
    axios.delete(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:DELETE_ADVERT,
            payload:res
        }))
}