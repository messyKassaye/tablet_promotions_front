import {FETCH_PLACES} from "../authConstants/authConstants";
const initialState = {
    loading:true,
    places:[]
}

export default function (state=initialState,action) {
    switch (action.type) {

        case FETCH_PLACES:
            return {
                ...state,
                places: action.payload,
                loading: false
            }
        default:
            return state

    }
}