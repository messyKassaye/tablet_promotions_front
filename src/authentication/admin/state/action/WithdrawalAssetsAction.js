import {STORE_WITHDRAWAL_ASSEt} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'withdraw_assets'

export const storeWithdrawAssets = (data)=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_WITHDRAWAL_ASSEt,
            payload:res
        }))
}