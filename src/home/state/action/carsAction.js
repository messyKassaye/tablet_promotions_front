import {FETCH_CARS} from "../stateConstants/actionConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";

const PATH = 'categories'
export const fetchCars = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_CARS,
            payload:res.data
        }))
}