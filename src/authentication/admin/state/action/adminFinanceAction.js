import {ADMIN_STORE_FINANCE} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

const PATH = 'finances'

export const adminStoreFinance = data=>dispatch=>{
    axios.post(`${ADMIN_API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:ADMIN_STORE_FINANCE,
            payload:res
        }))
}
