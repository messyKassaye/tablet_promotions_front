import {COMMON_SHOW_ADVERT, COMMON_STORE_ADVERT} from "../actionConstant/commonConstatnts";

const initialState = {
    advert:{},
    loading:true,
    response:{
        status:false,
        message:'',
        data:{},
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_STORE_ADVERT:
            return{
                ...state,
                response: action.payload
            }
        case COMMON_SHOW_ADVERT:
            return {
                ...state,
                loading:false,
                advert:action.payload
            }

        default:
            return state

    }

}
