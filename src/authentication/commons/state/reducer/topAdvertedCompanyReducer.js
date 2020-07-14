import {COMMON_TOP_ADVERTED_COMPANY} from "../actionConstant/commonConstatnts";

const initialState = {
    topAdverts:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {

        case COMMON_TOP_ADVERTED_COMPANY:
            return{
                ...state,
                topAdverts:action.payload,
                loading: false,
            }
        default:
            return state;
    }
}