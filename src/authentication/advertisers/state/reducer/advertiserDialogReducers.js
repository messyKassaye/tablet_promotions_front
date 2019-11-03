import {SHOW_ADVERT_PAYMENT_CONFIM_DIALOG, SHOW_CONFIRM_ADVERT_DELETE_DIALOG} from "../constants/advertConstants";

const initialState={
    showAdvertPaymentConfirmDialog:{
        show:false,
        advert_id:''
    },
    deleteAdvert:{
        show:false,
        advert:{}
    }
}

export default function (state=initialState,action) {
    switch (action.type) {
        case SHOW_ADVERT_PAYMENT_CONFIM_DIALOG:
            return {
                ...state,
                showAdvertPaymentConfirmDialog: action.payload
            }
        case SHOW_CONFIRM_ADVERT_DELETE_DIALOG:
            return {
                ...state,
                deleteAdvert: action.payload

            }

        default:
            return state
    }
}