import {STORE_COMPANY} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH= "companies"

export const storeCompany = (data)=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type: STORE_COMPANY,
            payload:res.data,
        }))
}
