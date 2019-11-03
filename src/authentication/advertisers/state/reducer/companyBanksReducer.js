import {COMPANY_BANKS} from "../constants/advertConstants";
const initialState = {
    loading:true,
    banks:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMPANY_BANKS:
            return {
                ...state,
                loading: false,
                banks: action.payload
            }

        default:
            return state
    }
}