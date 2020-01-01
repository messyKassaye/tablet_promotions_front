import {UPDATE_NOTIFICATIONS} from "../actionConstant/commonConstatnts";

const initialState = {
    response: {
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case UPDATE_NOTIFICATIONS:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
