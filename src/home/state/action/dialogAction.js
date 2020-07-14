import {SHOW_HOME_DIALOG} from "../stateConstants/actionConstants";

export const showHomeDialog = (data)=>dispatch=>{
    console.log('Called')
    dispatch({
        type:SHOW_HOME_DIALOG,
        payload:data
    })
}