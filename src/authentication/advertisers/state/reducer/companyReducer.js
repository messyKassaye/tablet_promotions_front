import {STORE_COMPANY} from "../constants/advertConstants";

const initialState = {
    loading:true,
    company:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_COMPANY:
            return {
                ...state,
                loading: false,
                company: action.payload
            }
        default:
            return state

    }
}
