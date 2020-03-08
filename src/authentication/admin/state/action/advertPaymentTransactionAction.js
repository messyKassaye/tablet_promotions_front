import {UPDATE_ADVERT_PAYMENT_TRANSACTION} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'advert_payment_transaction'

export const updateAdvertPaymentTransaction = (id)=>dispatch=>{
    axios.put(`${ADMIN_API_URL}${PATH}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_ADVERT_PAYMENT_TRANSACTION,
            payload:res
        }))
}