import {ME} from "../authConstants/authConstants";
import axios from 'axios'
import {API_AUTH_URL} from "../../../constants/constants";
export const me = ()=>dispatch=>{
    axios.get(`${API_AUTH_URL}me`)
        .then(response => response.data)
        .then(res =>dispatch({
            type:ME,
            payload: res.data
        }))
}