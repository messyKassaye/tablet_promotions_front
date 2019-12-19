import {CAR_CATEGORY_STORE, FETCH_CARS_CATEGORY, UPDATE_CAR_CATEGORY} from "../actionConstants/adminActionConstants";
const initialState = {
    response:{
        status:false,
        message:'',
        data:[]
    },
    category:[],
    loading:true
}

export default function (state=initialState,action) {
    switch (action.type) {
        case CAR_CATEGORY_STORE:
            return {
                ...state,
                response: action.payload
            }
        case FETCH_CARS_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false
            }

        case UPDATE_CAR_CATEGORY:
            return {
                ...state,
                response: action.payload
            }

        default:
            return state

    }
}
