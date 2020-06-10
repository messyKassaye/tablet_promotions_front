import {CARS_FETCH} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
export const categoriesFetch = ()=>dispatch=>{
    axios.get(`${API_URL}categories`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:CARS_FETCH,
            payload:res.data
        }))
}