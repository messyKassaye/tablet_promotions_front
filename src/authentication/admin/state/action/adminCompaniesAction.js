import {FETCH_COMPANIES} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";
const PATH = 'companies'

export const fetchCompanies = ()=>dispatch=>{
    axios.get(`${ADMIN_API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_COMPANIES,
            payload:res.data
        }))
}
