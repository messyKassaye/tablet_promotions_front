import {RESET_PASSWORD} from "../actionConstant/commonConstatnts";

const initialState = {
    response:{
        status:'',
        token:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case RESET_PASSWORD:
            return {
                ...state,
                response:action.payload
            }
        default:
            return state

    }

}