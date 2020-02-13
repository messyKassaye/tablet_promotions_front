import {FETCH_DOWNLOAD} from "../actionConstants/DownloaderConstant";

const initialState = {
    loading:true,
    response:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_DOWNLOAD:
            return {
                ...state,
                loading: false,
                response: action.payload
            }

        default:
            return state

    }

}