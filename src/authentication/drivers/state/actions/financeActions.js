import {FINANCE_FETCH} from "../constants/authConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

export const financeFetch = ()=>dispatch=>{
    axios.get(`${API_URL}finances`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FINANCE_FETCH,
            payload:res.data
        }))

}