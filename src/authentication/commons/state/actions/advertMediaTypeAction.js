import {COMMON_FETCH_ADVERT_MEDIA} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH='advertisement_media'

export const commonFetchAdvertMedia = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_FETCH_ADVERT_MEDIA,
            payload:res.data
        }))
}
