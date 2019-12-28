import {SHOW_MAIN_DIALOG} from "../actionConstants/adminActionConstants";

const initialState = {
    showDialog:{
        show:false,
        maxWidth:'md',
        page:null,
        title:'',
        actions:{
            on:false,
            path:'',
            id:''
        }
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SHOW_MAIN_DIALOG:
            return {
                ...state,
                showDialog: action.payload
            }

        default:
            return state

    }
}
