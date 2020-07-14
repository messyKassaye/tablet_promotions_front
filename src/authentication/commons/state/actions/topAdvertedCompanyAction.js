import {COMMON_TOP_ADVERTED_COMPANY} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'top_adverted_company'

export const topAdvertedCompanies = ()=>dispatch=>{
    console.log('called')
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_TOP_ADVERTED_COMPANY,
            payload:res
        }))
}