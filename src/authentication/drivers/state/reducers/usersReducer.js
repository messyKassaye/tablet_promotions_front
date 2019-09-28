import {ME} from "../constants/authConstants";

const  initialState = {
    loading:false,
    user:{}
}

export default function (state=initialState,action) {
    switch (action.type) {

        case ME:
            return {
                ...state,
                loading:true,
                user : action.payload
            }
        default:
            return  state
    }
}