import {DELETE_ADVERT, SHOW_ADVERT, STORE_ADVERT} from "../constants/advertConstants";

const initialState = {
    loading:true,
    showLoading:true,
    advert:{},
    status:false,
    deleteResponseMessage:''
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_ADVERT:
            return {
                ...state,
                loading: false,
                status:true,
                advert: action.payload
            }
        case SHOW_ADVERT:
            return {
                ...state,
                showLoading: false,
                advert: action.payload
            }
        case DELETE_ADVERT:
            return {
                ...state,
                deleteResponseMessage: action.payload.message

            }
        default:
            return  state

    }

}