import {FETCH_COMPANIES} from "../actionConstants/adminActionConstants";

const initialState = {
    company:[],
    loading:true,
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
                company: action.payload,
                loading: false
            }
        default:
            return state

    }
}
