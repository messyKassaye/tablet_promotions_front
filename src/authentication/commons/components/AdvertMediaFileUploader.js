import React, {Component} from 'react';
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import axios from 'axios'
import {LinearProgress} from "@material-ui/core";
class AdvertMediaFileUploader extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            loaded:0,
            valueBuffer:0,
            uploadStarted:false
        }
    }


    handleFile = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.setState({
            uploadStarted:true
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
                valueBuffer={this.state.valueBuffer}
                value={this.state.loaded}>
            </LinearProgress>
            <span>{`File is uploading. We reach ${Math.round(this.state.loaded,2)}%`}</span>
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
                    accept="image/video/audio/*"
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
