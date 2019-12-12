import {DELETE_ITEM} from "../actionConstants/adminActionConstants";
const initialState = {
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case DELETE_ITEM:
            return{
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
