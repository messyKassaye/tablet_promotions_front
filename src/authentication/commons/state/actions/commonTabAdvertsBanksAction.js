import {COMMON_FETCH_TAB_ADVERT_BANKS} from "../actionConstant/commonConstatnts";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH = 'tablet_promotion_banks'

export const commonFetchTabAdvertsBanks = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:COMMON_FETCH_TAB_ADVERT_BANKS,
            payload:res.data
        }))
}
