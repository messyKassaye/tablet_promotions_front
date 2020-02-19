import {FETCH_VIEWED_ADVERT} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'car_advert'

export const fetchViewedAdverts = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_VIEWED_ADVERT,
            payload:res.data
        }))
}