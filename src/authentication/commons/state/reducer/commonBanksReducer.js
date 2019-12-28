import {COMMON_BANKS_FETCH} from "../actionConstant/commonConstatnts";

const initialState = {
    commonBanks:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_BANKS_FETCH:
            return {
                ...state,
                commonBanks: action.payload,
                loading: false
            }
        default:
            return state

    }

}
