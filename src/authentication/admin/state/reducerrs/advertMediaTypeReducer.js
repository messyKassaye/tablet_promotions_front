import {
    FETCH_ADVERT_MEDIA_TYPE,
    STORE_ADVERT_MEDIA_TYPE,
    UPDATE_ADVERT_MEDIA_TYPE
} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:'',
        data:[]
    },
    advertMedia:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_ADVERT_MEDIA_TYPE:
            return {
                ...state,
                response: action.payload
            }
        case FETCH_ADVERT_MEDIA_TYPE:
            return {
                ...state,
                advertMedia: action.payload,
                loading: false
            }
        case UPDATE_ADVERT_MEDIA_TYPE:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
