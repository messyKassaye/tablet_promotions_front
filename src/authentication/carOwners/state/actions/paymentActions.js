import {PAYMENT_FETCH} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH ='payments';
export const paymentFetch = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:PAYMENT_FETCH,
            payload:res.data
        }))
}