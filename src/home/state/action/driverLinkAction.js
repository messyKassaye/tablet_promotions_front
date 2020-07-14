import {SHOW_DRIVER_LINK} from "../stateConstants/actionConstants";
import axios from 'axios'
import {API_URL} from "../../../constants/constants";
export const showDriverLink = id=>dispatch=>{
    axios.get(`${API_URL}driver_link/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:SHOW_DRIVER_LINK,
            payload:res
        }))
}