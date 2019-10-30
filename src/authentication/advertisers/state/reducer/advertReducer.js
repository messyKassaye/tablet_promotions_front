import {STORE_ADVERT} from "../constants/advertConstants";

const initialState = {
    loading:true,
    advert:{},
    status:false,
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
        default:
            return  state

    }

}