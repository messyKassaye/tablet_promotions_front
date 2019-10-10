import {BANK_ACCOUNT_FETCH} from "../authConstants/authConstants";
const initialState = {
    accounts:[],
    loading:true
}
export default function (state=initialState,action) {
    switch (action.type) {
        case BANK_ACCOUNT_FETCH:
            return {
                ...state,
                accounts: action.payload,
                loading: false
            }
        default:
            return state

    }

}