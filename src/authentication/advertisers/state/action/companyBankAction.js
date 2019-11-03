import {COMPANY_BANKS} from "../constants/advertConstants";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";
const PATH= "tablet_promotion_banks"

export const tabletPromotionBanks = ()=> dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response =>response.data)
        .then(res=>dispatch({
            type:COMPANY_BANKS,
            payload:res.data
        }))
}