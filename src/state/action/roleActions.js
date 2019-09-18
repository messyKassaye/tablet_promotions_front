import {FETCH_ROLE} from "../stateConstants/actionConstants";
import {API_URL} from '../../constants/constants'
export const fetchRole =()=>dispatch=>{
     fetch(`${API_URL}roles`).then(response=> response.json())
         .then(response=>dispatch(
             {
                 type:FETCH_ROLE,
                 payload:response.data
             }
         ))
}