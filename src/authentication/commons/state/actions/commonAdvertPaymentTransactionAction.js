import {COMMON_STORE_ADVERT_PAYMENT_TRANSACTION} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'advert_payment_transaction'

export const commonStoreBankTransaction = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_STORE_ADVERT_PAYMENT_TRANSACTION,
            payload:res
        }))
}
