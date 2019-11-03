import {STORE_BANK_TRANSACTION} from "../constants/advertConstants";
const initialState = {
    loading:true,
    response:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_BANK_TRANSACTION:
            return {
                ...state,
                loading: false,
                response: action.payload
            }

        default:
            return state

    }

}