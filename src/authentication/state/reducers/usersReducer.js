import {DELETE_ADVERT_LOCALLY, ME, STORE_NEW_ADVERT_LOCALLY, UPDATE_USER} from "../authConstants/authConstants";

const  initialState = {
    loading:true,
    user:{},
    update:{}
}

export default function (state=initialState,action) {
    switch (action.type) {

        case ME:
            return {
                ...state,
                loading:false,
                user : action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                update: action.payload
            }
        case STORE_NEW_ADVERT_LOCALLY:
            return {
                ...state,
                user: state.user.map(items=>items.relations.companies.map(company=>company.advert.map(advert=>{advert.push(advert)})))
            }
        default:
            return  state
    }
}
