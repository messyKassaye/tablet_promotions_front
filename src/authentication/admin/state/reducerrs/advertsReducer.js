import {FETCH_ADVERTS, SHOW_ADMIN_ADVERT, UPDATE_ADVERT} from "../actionConstants/adminActionConstants";

const initialState = {
    adverts:[],
    showAdverts:[],
    showLoading: true,
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
        case SHOW_ADMIN_ADVERT:
            return {
                ...state,
                showAdverts: action.payload,
                showLoading: false
            }
        default:
            return state

    }
}
