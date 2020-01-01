import {COMMON_STORE_ADVERT_COMPLAIN} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'advert_complain'

export const storeAdvertComplain = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_STORE_ADVERT_COMPLAIN,
            payload:res
        }))
}
