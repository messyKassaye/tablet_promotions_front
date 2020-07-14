import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import {connect} from "react-redux";
import Slide from "@material-ui/core/Slide";
import {showHomeDialog} from "../state/action/dialogAction";
import withStyles from "@material-ui/core/styles/withStyles";
import {homeDialogStyle} from "./styles/homeDialogStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class HomeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            fullScreen: false,
            submitted: false,
            loading: false,
            finished: false,
            showStatus:false,
            deletingMessage:''
        }
    }


    handleClose = ()=>{
        this.props.showHomeDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
    }

    renderComponent = (page)=>{
        return page
    }

    componentDidMount() {
        console.log(this.props.showData.show)
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
        const {classes,t} = this.props
        return (
            <Dialog
                maxWidth={this.props.showData.maxWidth}
                style={{top:5}}
                fullScreen={this.state.fullScreen||this.props.showData.fullScreen}
                disableBackdropClick={true}
                open={this.props.showData.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}>

                <DialogTitle  id="customized-dialog-title" onClose={this.handleClose}>
                    <Typography style={{fontSize:'16px'}}>{this.props.showData.title}</Typography>
                    <IconButton
                        className={classes.closeButton}
                        color='inherit'
                        aria-label='close dialog'
                        onClick={this.handleClose}
                        edge='end'>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {this.renderComponent(this.props.showData.page)}
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = state=>({
    showData:state.homeReducer.homeDialogReducer.showHomeDialog
})

export default withStyles(homeDialogStyle)(connect(mapStateToProps,{showHomeDialog})(HomeDialog));