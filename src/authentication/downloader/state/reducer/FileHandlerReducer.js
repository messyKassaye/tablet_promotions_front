import {HANDLE_FILE} from "../actionConstants/DownloaderConstant";

const initialState = {
    response:{
        status:false,
        file_path:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case HANDLE_FILE:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }

}