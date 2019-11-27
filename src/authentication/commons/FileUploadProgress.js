import React from "react";
import EventEmitter from 'events'
import Button from "@material-ui/core/Button";
class FileUploadProgress extends React.Component{

    constructor(props) {
        super(props);
        this.proxy = new EventEmitter();

    }

    openFileDialog = ()=>{
        let input = React.findDOMNode(this.refs.input)
        input.click();
    }

    render() {
        return (
            <div style={{display:"flex",flexDirection:'column',alignItems:'center',justifyContent:"center"}}>
                <input
                type={'file'}
                multiple={false}
                accept={`${this.props.accept}`}
                style={{display:'none'}}
                ref='input'
                onChange={this.handleFileChange}
                />
                <Button
                    style={{textTransform:'capitalize'}}
                    color={"primary"}
                    onClick={this.openFileDialog.bind(this)}
                    variant='outlined'>
                    Upload
                </Button>
            </div>
        );
    }


}

export default FileUploadProgress