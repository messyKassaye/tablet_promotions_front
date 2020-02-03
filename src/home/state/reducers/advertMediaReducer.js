import {FETCH_ADVERT_MEDIA} from "../stateConstants/actionConstants";

const initialState = {
    medias:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_ADVERT_MEDIA:
            return{
                ...state,
                medias:action.payload,
                loading: false
            }
        default:
            return state

    }

}