import {COMMON_FETCH_TAB_ADVERT_BANKS} from "../actionConstant/commonConstatnts";
const initialState = {
    commonTabAdvertBanks:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_FETCH_TAB_ADVERT_BANKS:
            return{
                ...state,
                loading: false,
                commonTabAdvertBanks: action.payload
            }
        default:
            return state

    }

}
