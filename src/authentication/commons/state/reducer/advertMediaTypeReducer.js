import {COMMON_FETCH_ADVERT_MEDIA} from "../actionConstant/commonConstatnts";

const initialState = {
    mediaTypes:[],
    loading:true
}

export default function (state=initialState,action) {

    switch (action.type) {
        case COMMON_FETCH_ADVERT_MEDIA:
            return{
                ...state,
                mediaTypes: action.payload,
                loading: false
            }

        default:
            return state

    }

}
