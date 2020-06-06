import {FETCH_COMPANIES, STORE_COMPANY, UPDATE_COMPANY} from "../constants/advertConstants";

const initialState = {
    loading:true,
    companies:[],
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
        case FETCH_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                loading: false
            }
        default:
            return state

    }
}
