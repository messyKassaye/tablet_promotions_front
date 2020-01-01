import {COMMON_STORE_ADVERT_COMPLAIN} from "../actionConstant/commonConstatnts";
const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case COMMON_STORE_ADVERT_COMPLAIN:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state;

    }

}
