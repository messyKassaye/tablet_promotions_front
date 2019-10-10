import {SHOW_CAR_REGISTRATION_MODAL} from "../constants/driversConstants";
import {SENT_DEFAULT_VALUE_TO_DIALOG} from "../constants/driversConstants";
import {SHOW_BANK_ACCOUNT_SETTER} from "../constants/driversConstants";
import {SHOW_WITHDRAWAL_REQUEST} from "../constants/driversConstants";

export const showCarRegistrationModal = (value)=> dispatch=>{
    dispatch({
        type:SHOW_CAR_REGISTRATION_MODAL,
        payload:value
    })
}

export const sentDialogValue = (value)=>dispatch=>{
    dispatch({
        type:SENT_DEFAULT_VALUE_TO_DIALOG,
        payload: value
    })
}

export const showBankAccountSetterModal = (value)=>dispatch=>{
    dispatch({
        type:SHOW_BANK_ACCOUNT_SETTER,
        payload:value
    })
}

export const showWithdrawalRequestDialog = (value)=>dispatch=>{
    dispatch({
        type:SHOW_WITHDRAWAL_REQUEST,
        payload:value
    })
}