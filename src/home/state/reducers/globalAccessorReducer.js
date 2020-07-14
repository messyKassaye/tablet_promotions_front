import {GLOBAL_ACCESSOR, GLOBAL_ACCESSOR_FETCH} from "../stateConstants/actionConstants";
const initialState = {
    response:{},
    webAccessor:0,
    webAccessorLoading:true,
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case GLOBAL_ACCESSOR:
            return {
                ...state,
                response:action.payload,
                loading:false
            }
        case GLOBAL_ACCESSOR_FETCH:
            return {
                ...state,
                webAccessor:action.payload,
                webAccessorLoading: false
            }
        default:
            return state

    }
}