import {COMMON_PER_PLAY_PAYER} from "../actionConstant/commonConstatnts";

const initialState = {
    adverts:[],
    loading:true
}

export default function (state=initialState,action) {

    switch (action.type) {
        case COMMON_PER_PLAY_PAYER:
            return {
                ...state,
                adverts: action.payload,
                loading: false
            }

        default:
            return state

    }

}