import {UPDATE_CAR_ADVERT} from "../actionConstants/adminActionConstants";
const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {

        case UPDATE_CAR_ADVERT:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}