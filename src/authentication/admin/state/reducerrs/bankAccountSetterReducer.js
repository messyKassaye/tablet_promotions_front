import {BANK_ACCOUNT_SETTER} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:'',
        data:[]
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case BANK_ACCOUNT_SETTER:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
