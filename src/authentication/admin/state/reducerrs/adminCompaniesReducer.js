import {FETCH_COMPANIES} from "../actionConstants/adminActionConstants";

const initialState = {
    company:[],
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_COMPANIES:
            return{
                ...state,
                company: action.payload
            }
        default:
            return state

    }
}
