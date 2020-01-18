import {FETCH_CURRENCY, STORE_CURRENCY, UPDATE_CURRENCY} from "../actionConstants/adminActionConstants";

const initialState = {
    currency:[],
    loading:true,
    response:{
        status:false,
        message:''
    }
}


export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_CURRENCY:
            return {
                ...state,
                currency: action.payload,
                loading: false
            }

        case STORE_CURRENCY:
            return {
                ...state,
                response: action.payload
            }

        case UPDATE_CURRENCY:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
