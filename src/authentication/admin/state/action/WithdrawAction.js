import {FETCH_WITHDRAW} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'withdrawals'

export const fetchWithdrawal = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_WITHDRAW,
            payload:res.data
        }))
}