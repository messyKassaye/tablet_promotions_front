import {ADVERT_PAYMENT_STORE} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case ADVERT_PAYMENT_STORE:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}