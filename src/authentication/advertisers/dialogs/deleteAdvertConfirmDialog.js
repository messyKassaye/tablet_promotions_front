import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import dialogStyle from "./style/dialogsStyle";
import {connect} from "react-redux";
import {showAdvertConfirmDeleteDialog} from "../state/action/advertiserDialogActions";
import {Typography} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {deleteAdvert} from "../state/action/advertAction";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {green} from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class DeleteAdvertDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            fullScreen: false,
            submitted:false,
            loading:false,
            showStatus:false
        }
        this.handleClose = this.handleClose.bind(this)
        this.deleteAdvert = this.deleteAdvert.bind(this)

    }
 handleClose = ()=>{
        this.props.showAdvertConfirmDeleteDialog({'show':false,'advert':this.props.deleteData.advert})
 }

 deleteAdvert = (id)=>{
     this.setState({
         submitted:true,
         loading:true
     })
        this.props.deleteAdvert(id)
 }
 componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response){
            this.setState({
                loading:false,
                finished:true,
                submitted:false,
                showStatus:true
            })

        }
 }

 componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.response!==''){
            setTimeout(()=>{
                this.handleClose()
                window.location.reload()
            },800)
        }
 }

    render() {
        const {classes} = this.props
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = true
        return (
            <Dialog
                fullScreen={this.state.fullScreen}
                disableBackdropClick={true}
                open={this.props.deleteData.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}>
                <DialogTitle  id="customized-dialog-title" onClose={this.handleClose}>
                    Confirm
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
                    {
                        this.props.response===''
                        ?
                            (
                                <Typography>
                                    {`Are you sure you want to delete the advertisement data of  ${this.props.deleteData.advert.product_name}`}
                                </Typography>
                            )
                        :
                            (
                                <Typography style={{color:green[500]}}>
                                    {this.props.response}
                                </Typography>
                            )


                    }

                </DialogContent>
                <DialogActions style={{display:'flex',justifyContent:'flex-end'}}>
                    <LoadingButton
                        onClick={()=>this.deleteAdvert(this.props.deleteData.advert.id)}
                        color='primary'
                        variant='outlined'
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={'Yes'}
                        disabled={!isEnabled ||this.state.submitted}
                        style={{textTransform:'capitalize'}}>
                        Yes
                    </LoadingButton>
                    <Button
                        onClick={this.handleClose}
                        color='secondary'
                        variant='outlined'
                        style={{textTransform:'capitalize'}}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }


}
const mapStateToProps = state=>({
    deleteData:state.authReducer.advertisersReducers.dialogsData.deleteAdvert,
    response:state.authReducer.advertisersReducers.advertData.deleteResponseMessage,
    user: state.userData.user,
})

export default connect(mapStateToProps,{showAdvertConfirmDeleteDialog,deleteAdvert})(withStyles(dialogStyle)(DeleteAdvertDialog))