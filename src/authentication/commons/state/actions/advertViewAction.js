import {COMMON_SHOW_ADVERT_VIEW} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'advert_view'

export const showAdvertView = id=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_SHOW_ADVERT_VIEW,
            payload:res.data
        }))
}