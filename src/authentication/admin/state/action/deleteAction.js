import {DELETE_ITEM} from "../actionConstants/adminActionConstants";
import axios from 'axios'
import {ADMIN_API_URL} from "../../../../constants/constants";

export const deleteAction = (path,id)=>dispatch=>{
    axios.delete(`${ADMIN_API_URL}${path}/${id}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:DELETE_ITEM,
            payload:res
        }))
}
