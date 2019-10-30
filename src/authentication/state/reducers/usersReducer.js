import {ME, UPDATE_USER} from "../authConstants/authConstants";

const  initialState = {
    loading:true,
    user:{},
    update:{}
}

export default function (state=initialState,action) {
    switch (action.type) {

        case ME:
            return {
                ...state,
                loading:false,
                user : action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                update: action.payload
            }
        default:
            return  state
    }
}