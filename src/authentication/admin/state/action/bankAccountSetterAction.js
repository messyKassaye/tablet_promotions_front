import {BANK_ACCOUNT_SETTER} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'bank_accounts'

export const bankAccountStore = data=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:BANK_ACCOUNT_SETTER,
            payload:res
        }))
}
