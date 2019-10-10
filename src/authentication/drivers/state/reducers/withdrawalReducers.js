import {STORE_WITHDRAWAL, WITHDRAWAL_FETCH} from "../constants/driversConstants";

const initialState = {
    loading:true,
    withdrawals:[],
    response:{}
}

export default function (state=initialState,action) {
    switch (action.type) {

        case WITHDRAWAL_FETCH:
            return {
                ...state,
                withdrawals: action.payload,
                loading: false
            }

        case STORE_WITHDRAWAL:
            return {
                ...state,
                response: action.payload
            }
        default:
            return  state

    }

}