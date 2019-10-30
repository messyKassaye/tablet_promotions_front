import {STORE_ADVERT,ADVERT_STATUS} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH='adverts'
export const storeAdvert = (data)=>dispatch=>{
    console.log(data)
    axios.post(`${API_URL}${PATH}`,data,{
        headers: {
            'content-type': 'Application/json'
        },
    })
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_ADVERT,
            payload:res.data
        }))

}

export const setAdvertStatus = (status)=>dispatch=>{
    dispatch({
        type: ADVERT_STATUS,
        payload: status
    })
}