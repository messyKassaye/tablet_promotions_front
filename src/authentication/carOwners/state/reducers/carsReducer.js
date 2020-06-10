import {CARS_STORE, CARS_UPDATE} from "../constants/driversConstants";
const initialState = {
    responseStatus:{
        status:false,
        message:"",
        car:{}
    },
    updateResponse: {
        status: false,
        message:''
    },
    loading:true
}
export default function (state=initialState,action) {
  switch (action.type) {
      case CARS_STORE:
          return {
              ...state,
              responseStatus: action.payload,
              loading: false
          }
      case CARS_UPDATE:
          return {
              ...state,
              updateResponse: action.payload
          }
      default:
          return state
  }
}