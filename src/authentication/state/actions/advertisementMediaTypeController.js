import {FETCH_MEDIA_TYPE} from "../authConstants/authConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
const PATH="advertisement_media";
export const fetchMediaType = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_MEDIA_TYPE,
            payload:res.data
        }))
}