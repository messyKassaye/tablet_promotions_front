import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {connect} from "react-redux";
import {showMainDialog} from "../state/action/dialogAction";
import Button from "@material-ui/core/Button";
import adminMainDialogStyle from "./styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import {DialogActions, Typography} from "@material-ui/core";
import {deleteAction} from "../state/action/deleteAction";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class MainDialog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open:false,
            fullScreen: false,
            submitted:false,
            loading:false,
            showStatus:false
        }



    }

    handleClose = ()=>{
        this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
    }

    renderComponent = (page)=>{
        return page
    }

    deleteItem = (path,id)=>{
      this.props.deleteAction(path,id)
    }
    componentDidMount() {
        let deviceWidth = window.innerWidth;
        if(deviceWidth<=760){
            this.setState({
                fullScreen:true
            })
        }else {
            this.setState({
                fullScreen:false
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            setTimeout(()=>{
                this.handleClose()
            },2000)
        }
    }

    render() {
        const {classes,t} = this.props
        return (
            <Dialog
                fullScreen={this.state.fullScreen}
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
                {
                    this.props.showData.actions.on===true
                    ?
                        (
                            <DialogActions>

                                <Button color='secondary' variant='text' onClick={()=>this.handleClose()}>
                                    No
                                </Button>

                                <Button color='primary' variant='outlined' onClick={()=>this.deleteItem(this.props.showData.actions.path,this.props.showData.actions.id)}>
                                    Yes
                                </Button>
                            </DialogActions>
                        )
                    :
                        (<div></div>)
                }
            </Dialog>
        );
    }
}

const mapStateToProps = state=>({
    showData: state.authReducer.adminReducers.adminDialog.showDialog,
    response:state.authReducer.adminReducers.deleteReducer.response
})

export default connect(mapStateToProps,{showMainDialog,deleteAction})
(withStyles(adminMainDialogStyle)(translate('common')(MainDialog)));
