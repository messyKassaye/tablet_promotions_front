import {STORE_DRIVER} from "../constants/driversConstants";
const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_DRIVER:
            return{
                ...state,
                response: action.payload
            }
        default:
            return state;

    }

}