import {FETCH_VIEWED_ADVERT} from "../actionConstants/adminActionConstants";
const initialState = {
    viewedAdverts:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_VIEWED_ADVERT:
            return{
                ...state,
                viewedAdverts: action.payload,
                loading: false
            }

        default:
            return state

    }

}