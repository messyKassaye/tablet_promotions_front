import {BANK_FETCH,STORE_BANK} from "../authConstants/authConstants";

const initialState = {
    banks:[],
    loading:true,
    response:{}
}
export default function (state=initialState,action) {

    switch (action.type) {
        case BANK_FETCH:
            return {
                ...state,
                banks: action.payload,
                loading: false
            }

        case STORE_BANK:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state

    }

}