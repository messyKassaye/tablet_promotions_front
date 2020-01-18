import {STORE_PLACES, FETCH_PLACES, UPDATE_PLACES} from "../actionConstants/adminActionConstants";

const initialState = {
    loading:true,
    places:[],
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_PLACES:
            return {
                ...state,
                loading: false,
                places: action.payload

            }

        case UPDATE_PLACES:
            return {
                ...state,
                response: action.payload
            }
        case STORE_PLACES:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state

    }

}