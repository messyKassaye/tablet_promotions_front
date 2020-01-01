import {ADMIN_STORE_FINANCE} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:'',
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case ADMIN_STORE_FINANCE:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}
