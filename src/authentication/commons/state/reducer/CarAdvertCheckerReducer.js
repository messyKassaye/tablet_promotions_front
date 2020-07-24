import {COMMON_FETCH_CAR_ADVERT_CHECKER} from "../actionConstant/commonConstatnts";

const initialState= {
    carAdverts:{
        current_page:0,
        data:[],
        first_page_url:'',
        from:'',
        next_page_url:'',
        path:'',
        per_page:'',
        prev_page_url:'',
        to:''
    },
    loading:true,
    response:{}
}

export default function (state=initialState,action) {
    switch (action.type)  {
        case COMMON_FETCH_CAR_ADVERT_CHECKER:
            return{
                ...state,
                carAdverts: action.payload,
                loading: false
            }
        default:
            return state

    }

}