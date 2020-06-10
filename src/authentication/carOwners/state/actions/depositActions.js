import {DEPOSIT_FETCH} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
export const depositFetch = ()=>dispatch=>{
    axios.get(`${API_URL}deposits`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:DEPOSIT_FETCH,
            payload:res.data
        }))
}