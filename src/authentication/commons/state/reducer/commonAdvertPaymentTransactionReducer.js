import {COMMON_STORE_ADVERT_PAYMENT_TRANSACTION} from "../actionConstant/commonConstatnts";

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_STORE_ADVERT_PAYMENT_TRANSACTION:
            return{
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}
