import {CARS_FETCH} from "../constants/driversConstants";

const initialState = {
    loading:true,
    categories:[]
}

export default function (state=initialState,action) {

    switch (action.type) {
        case CARS_FETCH:
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        default:
            return state

    }

}