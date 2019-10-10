import {BANK_FETCH} from "../authConstants/authConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
export const bankFetch = ()=>dispatch=>{

    axios.get(`${API_URL}banks`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:BANK_FETCH,
            payload:res.data
        }))
}