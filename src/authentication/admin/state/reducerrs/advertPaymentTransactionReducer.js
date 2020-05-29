import {UPDATE_ADVERT_PAYMENT_TRANSACTION} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {

    switch (action.type) {
        case UPDATE_ADVERT_PAYMENT_TRANSACTION:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state
    }

}