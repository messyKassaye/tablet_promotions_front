import {COMMON_CAR_ADVERT_SHOW, COMMON_CAR_ADVERT_UPDATE} from "../actionConstant/commonConstatnts";

const initialState = {
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
   switch (action.type) {
       case COMMON_CAR_ADVERT_SHOW:
           return {
               ...state,
               loading: false,
               carAdverts: action.payload
           }

       case COMMON_CAR_ADVERT_UPDATE:
           return {
               ...state,
               response: action.payload
           }

       default:
           return state

   }
}