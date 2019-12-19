import {FETCH_CURRENCY} from "../actionConstants/adminActionConstants";

const initialState = {
    currency:[],
    loading:true
}


export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_CURRENCY:
            return {
                ...state,
                currency: action.payload,
                loading: false
            }

        default:
            return state

    }
}
