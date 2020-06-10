 import {DEPOSIT_FETCH} from "../constants/driversConstants";

 const initialState = {
     loading:true,
    deposit:{}
 }
export default function (state=initialState,action) {
     switch (action.type) {
         case DEPOSIT_FETCH:
             return {
                 ...state,
                 deposit: action.payload,
                 loading: false
             }
         default:
             return state

     }
}