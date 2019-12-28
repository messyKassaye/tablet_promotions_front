import {FETCH_USERS, STORE_USER} from "../actionConstants/adminActionConstants";

const initialState = {
    users:[],
    loading:true,
    response:{
        status:false,
        message:''
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case STORE_USER:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
