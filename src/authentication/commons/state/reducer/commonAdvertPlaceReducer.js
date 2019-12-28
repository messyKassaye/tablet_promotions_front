import {COMMON_FETCH_ADVERT_PLACES} from "../actionConstant/commonConstatnts";
const initialState = {
    advertPlaces:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_FETCH_ADVERT_PLACES:
            return {
                ...state,
                advertPlaces: action.payload,
                loading: false
            }

        default:
            return state

    }

}
