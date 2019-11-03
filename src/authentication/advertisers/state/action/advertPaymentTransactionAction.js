import {STORE_BANK_TRANSACTION} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH="bank_transaction"
export const storeBankTransaction = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_BANK_TRANSACTION,
            payload:res.data
        }))

}