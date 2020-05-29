import {COMMON_SHOW_ADVERT_VIEW} from "../actionConstant/commonConstatnts";

const initialState = {
    advertViews:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_SHOW_ADVERT_VIEW:
            return {
                ...state,
                advertViews: action.payload,
                loading: false
            }
        default:
            return state

    }

}