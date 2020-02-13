import {HANDLE_FILE} from "../actionConstants/DownloaderConstant";
import axios from 'axios'
import {API_URL} from "../../../../constants/constants";

const PATH = 'file_handler';

export const handleFileZipping = ()=>dispatch=>{
    axios.post(`${API_URL}${PATH}`)
        .then(response=>response.data)
        .then(res=>dispatch({
            type:HANDLE_FILE,
            payload:res
        }))
}
