import {FETCH_ROLE} from "../stateConstants/actionConstants";
const initialState = {
    roles:[],
    role:{}
}

export default function (state=initialState,action) {
    switch (action.type) {
        case FETCH_ROLE:
            return {
                ...state,
                roles: action.payload
            }
        default:
            return state
    }

}