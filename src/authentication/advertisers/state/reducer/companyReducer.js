import {STORE_COMPANY, UPDATE_COMPANY} from "../constants/advertConstants";

const initialState = {
    loading:true,
    response:{
        status:false,
        message:'',
        data:[]
    },
    updateResponse:{
        status: false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case STORE_COMPANY:
            return {
                ...state,
                loading: false,
                response: action.payload
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state

    }
}
