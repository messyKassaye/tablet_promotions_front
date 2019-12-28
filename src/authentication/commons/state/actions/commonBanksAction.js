import {COMMON_BANKS_FETCH} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'banks'

export const commonBanksFetch = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_BANKS_FETCH,
            payload:res.data
        }))
}
