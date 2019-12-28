import {COMMON_STORE_ADVERT} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'adverts'

export const commonStoreAdvert = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_STORE_ADVERT,
            payload:res
        }))
}
