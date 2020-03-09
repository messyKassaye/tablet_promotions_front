import {COMMON_CAR_ADVERT_SHOW} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'car_adverts'

export const showCarAdvert = id=>dispatch=>{
    axios.get(`${API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_CAR_ADVERT_SHOW,
            payload:res
        }))
}
