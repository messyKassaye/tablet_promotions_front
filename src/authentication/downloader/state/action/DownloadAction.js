import {FETCH_DOWNLOAD} from "../actionConstants/DownloaderConstant";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'file_handler';

export const fetchDownload = ()=>dispatch=>{
    axios.get(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:FETCH_DOWNLOAD,
            payload:res
        }))
}

export const downloadFile = (data)=>dispatch=>{

}