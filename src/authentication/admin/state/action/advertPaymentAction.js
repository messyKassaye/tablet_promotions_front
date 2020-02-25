import {ADVERT_PAYMENT_STORE} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'advert_view_payment'

export const advertPaymentStore = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:ADVERT_PAYMENT_STORE,
            payload:res
        }))
}