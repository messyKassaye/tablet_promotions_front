import {COMMON_FETCH_CAR_ADVERT_CHECKER} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'car_advert_checker'
export const fetchCarAdvertChecker = (role,id)=>dispatch=>{
    axios.get(`${API_URL}${role}/${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_FETCH_CAR_ADVERT_CHECKER,
            payload:res
        }))
}