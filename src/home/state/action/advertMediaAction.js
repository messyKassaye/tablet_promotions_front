import {FETCH_ADVERT_MEDIA} from "../stateConstants/actionConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";

const PATH = 'advertisement_media'
export const fetchAdvertMedia = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ADVERT_MEDIA,
            payload:res.data
        }))
}