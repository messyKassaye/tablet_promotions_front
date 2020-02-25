import {FETCH_ADVERT_VIEW_PAYMENT} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'advert_view_payment'

export const fetchAdvertViewPayment = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_ADVERT_VIEW_PAYMENT,
            payload:res.data
        }))
}