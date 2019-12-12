import {SHOW_MAIN_DIALOG} from "../actionConstants/adminActionConstants";

export const showMainDialog = (data)=>dispatch=>{
    dispatch({
        type:SHOW_MAIN_DIALOG,
        payload:data
    })
}
