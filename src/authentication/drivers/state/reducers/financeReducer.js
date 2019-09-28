import {FINANCE_FETCH} from "../constants/authConstants";
import flags from "react-world-flags/src/flags";

const initialState = {
    loading:true,
    finance : {}
}

export default function (state=initialState,action) {
     switch (action.type) {
         case FINANCE_FETCH:
             return{
                 ...state,
                 finance: action.payload,
                 loading: false
             }
         default:
             return  state
     }
}