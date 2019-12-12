import {STORE_BASE64} from "../actionConstants/adminActionConstants";

const initialState = {
    base64Response:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_BASE64:
            console.log('reducer')
            return {
                ...state,
                base64Response: action.payload
            }
        default:
            return state

    }
}
