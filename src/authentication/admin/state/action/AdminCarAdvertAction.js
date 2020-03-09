import {UPDATE_CAR_ADVERT} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH = 'car_advert'

export const updateCarAdvert = (id,data)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_CAR_ADVERT,
            payload:res
        }))
}