import {STORE_WITHDRAWAL_ASSEt} from "../actionConstants/adminActionConstants";
const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_WITHDRAWAL_ASSEt:
            return{
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}