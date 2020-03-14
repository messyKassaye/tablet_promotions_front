import {SET_PLACE} from "../actionConstants/DownloaderConstant";

const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SET_PLACE:
            return{
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}