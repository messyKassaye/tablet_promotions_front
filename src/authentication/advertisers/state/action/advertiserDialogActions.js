import {SHOW_ADVERT_PAYMENT_CONFIM_DIALOG,SHOW_CONFIRM_ADVERT_DELETE_DIALOG} from "../constants/advertConstants";

export const showAdvertPaymentConfirmDialog = (data)=>dispatch=>{
    dispatch({
        type: SHOW_ADVERT_PAYMENT_CONFIM_DIALOG,
        payload:data
    })
}

export const showAdvertConfirmDeleteDialog = data=>dispatch=>{
    dispatch({
        type:SHOW_CONFIRM_ADVERT_DELETE_DIALOG,
        payload: data
    })
}
