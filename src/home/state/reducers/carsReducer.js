import {FETCH_CARS} from "../stateConstants/actionConstants";
const initialState = {
    loading:true,
    categories:[]
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_CARS:
            return {
                ...state,
                loading: false,
                categories: action.payload
            }
        default:
            return state

    }

}