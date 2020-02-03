import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import {DialogActions, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import LoadingButton from "./LoadingButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class VideoDiallog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open:false,
            fullScreen: false,
        }



    }

    componentDidMount() {
        let deviceWidth = window.innerWidth;
        if(deviceWidth<=760){
            this.setState({
                fullScreen:true,
            })
        }else {
            this.setState({
                fullScreen:false
            })
        }
    }
    render() {
        return (
            <Dialog
                maxWidth={this.props.showData.maxWidth}
                style={{top:5}}
                fullScreen={this.state.fullScreen}
                disableBackdropClick={true}
                open={this.props.showData.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}>
                <DialogContent dividers>

                </DialogContent>
            </Dialog>
        );
    }
}

export default VideoDiallog;