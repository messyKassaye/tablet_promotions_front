import {COMMON_FETCH_ADVERT_PLACES} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'places'

export const commonFetchAdvertPlaces = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_FETCH_ADVERT_PLACES,
            payload:res.data
        }))
}
