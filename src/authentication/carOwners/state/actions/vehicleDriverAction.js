import {STORE_DRIVER} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'vehicle_drivers'
export const storeDriver = data=>dispatch=>{
    axios.post(`${API_URL}${PATH}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:STORE_DRIVER,
            payload:res
        }))
}