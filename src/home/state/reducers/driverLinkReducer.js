import {SHOW_DRIVER_LINK} from "../stateConstants/actionConstants";

const initialState = {
    driver_link:{},
    loading:true,
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SHOW_DRIVER_LINK:
            return {
                ...state,
                driver_link: action.payload,
                loading: false
            }
        default:
            return state

    }

}