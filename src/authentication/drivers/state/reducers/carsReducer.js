import {CARS_STORE} from "../constants/driversConstants";
const initialState = {
    responseStatus:{},
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
      default:
          return state
  }
}