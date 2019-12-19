import {FETCH_ADVERTS, UPDATE_ADVERT} from "../actionConstants/adminActionConstants";

const initialState = {
    adverts:[],
    loading:true,
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_ADVERTS:
            return{
                ...state,
                adverts:action.payload,
                loading: false
            }
        case UPDATE_ADVERT:
            return {
                ...state,
                response:action.payload
            }
        default:
            return state

    }
}
