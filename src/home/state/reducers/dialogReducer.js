import {SHOW_HOME_DIALOG} from "../stateConstants/actionConstants";

const initialState = {
    showHomeDialog:{
        show:false,
        maxWidth:'md',
        page:null,
        title:'',
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SHOW_HOME_DIALOG:
            return {
                ...state,
                showHomeDialog: action.payload
            }

        default:
            return state

    }
}