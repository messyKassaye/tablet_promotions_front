import {FETCH_MEDIA_TYPE} from "../authConstants/authConstants";
const initialState = {
    loading:true,
    mediaTypes:[]
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_MEDIA_TYPE:
            return {
                ...state,
                mediaTypes: action.payload,
                loading: false
            }

        default:
            return  state

    }
}