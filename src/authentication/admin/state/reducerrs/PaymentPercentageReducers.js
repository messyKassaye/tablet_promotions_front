import {PAYMENT_PERCENTAGE, UPDATE_PAYMENT_PERCENTAGE} from "../actionConstants/adminActionConstants";
const initialState={
    paymentPercentage:[],
    loading:true,
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {

    switch (action.type) {
        case PAYMENT_PERCENTAGE:
            return{
                ...state,
                paymentPercentage: action.payload,
                loading: false
            }
        case UPDATE_PAYMENT_PERCENTAGE:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state
    }
}