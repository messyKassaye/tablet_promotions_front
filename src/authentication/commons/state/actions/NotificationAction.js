import {UPDATE_NOTIFICATIONS} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'notifications'
export const updateNotification = (data,id)=>dispatch=>{
    axios.put(`${API_URL}${PATH}/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:UPDATE_NOTIFICATIONS,
            payload:res
        }))
}
