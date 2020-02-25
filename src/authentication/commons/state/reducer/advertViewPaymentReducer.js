import {FETCH_ADVERT_VIEW_PAYMENT} from "../actionConstant/commonConstatnts";

const initialState = {
    payment:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {

        case FETCH_ADVERT_VIEW_PAYMENT:
            return{
                ...state,
                payment:action.payload,
                loading: false
            }

        default:
            return state

    }

}