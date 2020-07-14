import {GLOBAL_ACCESSOR, GLOBAL_ACCESSOR_FETCH} from "../stateConstants/actionConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
const PATH = 'ride_ads_accessor'

export const webAccessIndex = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(response=>dispatch({
            type:GLOBAL_ACCESSOR_FETCH,
            payload:response
        }))
}
export const webAccessor = data=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:GLOBAL_ACCESSOR,
            payload:res
        }))
}