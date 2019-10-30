import {FETCH_PLACES} from "../authConstants/authConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
const PATH="places"
export const fetchPlaces = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_PLACES,
            payload:res.data
        }))
}