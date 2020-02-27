import {FETCH_WITHDRAW} from "../actionConstants/adminActionConstants";

const initialState = {
    withdrawals:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_WITHDRAW:
            return {
                ...state,
                withdrawals: action.payload,
                loading: false
            }

        default:
            return state

    }

}