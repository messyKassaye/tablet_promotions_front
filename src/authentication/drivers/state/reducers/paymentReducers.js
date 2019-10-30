import {PAYMENT_FETCH} from "../constants/driversConstants";

const initialState = {
    payments:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {

        case PAYMENT_FETCH:
            return {
                ...state,
                payments: action.payload,
                loading: false
            }

        default:
            return state

    }

}