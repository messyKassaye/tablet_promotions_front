import {CARS_STORE, CARS_UPDATE} from "../constants/driversConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
export const carsStore = (data)=>dispatch=>{
    axios.post(`${API_URL}cars`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:CARS_STORE,
            payload:res
        }))
}


export const updateCars = (data,id)=>dispatch=>{
    axios.put(`${API_URL}cars/${id}`,data)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:CARS_UPDATE,
            payload: res
        }))
}