import {COMMON_STORE_ADVERT} from "../actionConstant/commonConstatnts";

const initialState = {
    response:{
        status:false,
        message:'',
        data:{}
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_STORE_ADVERT:
            return{
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}
