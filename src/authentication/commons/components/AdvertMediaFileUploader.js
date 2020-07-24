import React, {Component} from 'react';
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import {LinearProgress} from "@material-ui/core";
import {API_URL} from "../../../constants/constants";
class AdvertMediaFileUploader extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            loaded:0,
            valueBuffer:0,
            uploadStarted:false,
            fileUploadMessage:'File uploading. We reach 0%'
        }
    }


    handleFile = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('advert_id',this.props.advert.id)
        formData.append('file', file);
        this.setState({
            uploadStarted:true
        })
        axios.post(`${API_URL}file_uploader`,formData,{
            onUploadProgress:progressEvent => {
                this.setState({
                    loaded:Math.round((progressEvent.loaded * 100) / progressEvent.total),
                    fileUploadMessage: `File uploading. We reach ${this.state.loaded}%`
                })
            }
        })
            .then(response=>response.data)
            .then(res=>{
                 if (res.status&&this.state.loaded===100){
                     setTimeout(()=>{
                         this.setState({
                             fileUploadMessage:`Uploading done. ${this.state.loaded}%`
                         })
                         window.location.reload()
                     },2000)
                 }
            })
    }

    handleFileInput = ()=>{
        this.inputFile.current.click();
    }

    uploadStartedView = ()=>{
        return <div style={{display:'flex',flexDirection:'column'}}>
            <LinearProgress
                variant='buffer'
                color='secondary'
                valueBuffer={this.state.loaded}
                value={this.state.loaded}>
            </LinearProgress>
            <span>{this.state.fileUploadMessage}</span>
        </div>
    }

    showUploaderView = ()=>{
        return <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
            <span style={{color:green[500]}}>Payment is done. Upload media advert</span>
            <div>
                <input
                    onChange={this.handleFile}
                    ref={this.inputFile}
                    style={{display: 'none'}}
                    accept={`${this.props.advert.advert_media_type.name.toLowerCase()}/*,.mkv,.mp4,.mp3`}
                    id="outlined-button-file"
                    type="file"
                />
                <label>
                    <Button color='inherit' variant="outlined" size='small' onClick={this.handleFileInput}>
                        Upload
                    </Button>
                </label>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {
                    this.state.uploadStarted
                    ?
                        (this.uploadStartedView())
                    :
                        (this.showUploaderView())
                }

            </div>
        );
    }
}

export default AdvertMediaFileUploader;
