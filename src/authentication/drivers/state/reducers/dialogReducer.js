import {
    SHOW_BANK_ACCOUNT_SETTER,
    SHOW_CAR_REGISTRATION_MODAL,
    SHOW_WITHDRAWAL_REQUEST
} from "../constants/driversConstants";
import {SENT_DEFAULT_VALUE_TO_DIALOG} from "../constants/driversConstants";

const initialState ={
    show:false,
    showBankSetter:false,
    categories:[],
    defaultValues:{},
    showWithdrawalRequest:false

}

export default function (state=initialState,action) {
    switch (action.type) {
        case SHOW_CAR_REGISTRATION_MODAL:
            return {
                ...state,
                show: action.payload
            }
        case SENT_DEFAULT_VALUE_TO_DIALOG:
            return {
                ...state,
                defaultValues: action.payload
            }
        case SHOW_BANK_ACCOUNT_SETTER:
            return {
                ...state,
                showBankSetter: action.payload
            }
        case SHOW_WITHDRAWAL_REQUEST:
            return {
                ...state,
                showWithdrawalRequest: action.payload
            }
        default:
            return  state

    }

}

