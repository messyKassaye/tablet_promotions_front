import {FETCH_ROLE, STORE_ROLE, UPDATE_ROLE} from "../actionConstants/adminActionConstants";

const initialState = {
    response:{
        status:false,
        message:'',
        data:[]
    },
    role:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_ROLE:
            return {
                ...state,
                role: action.payload,
                loading: false
            }

        case UPDATE_ROLE:
            return  {
                ...state,
                response: action.payload
            }


        case STORE_ROLE:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
