import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import bankDialogstyle from "../style/dialogs";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {showWithdrawalRequestDialog} from "../state/actions/dialogActions";
import {showBankAccountSetterModal} from "../state/actions/dialogActions";
import {withdrawalStore} from "../state/actions/withdrawalActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import DialogActions from "@material-ui/core/DialogActions";
import {Typography} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class WithdrawalRequestDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            fullScreen: false,
            isSelectOpened:false,
            selectValue:'',
            showBigAmount:false,
            formData:{
                bank_id:'',
                amount:'',
                description:''
            },
            submitted:false,
            loading:false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSelectOpen = this.handleSelectOpen.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.openBankSetting = this.openBankSetting.bind(this)
    }

    handleSelect = ()=>{
        this.setState({
            isSelectOpened:false
        })
    }

    handleSelectOpen = ()=>{
        this.setState({
            isSelectOpened:true
        })
    }

    handleClose = ()=>{
        this.props.showWithdrawalRequestDialog(false)
    }

    handleSelectChange =(event)=>{
        this.setState({
            selectValue:event.target.value
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }
    handleSubmit = ()=>{
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.withdrawalStore(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response){
            this.setState({
                loading:false,
                finished:true,
                submitted:false
            })
            if(nextProps.response.status){
                setTimeout(()=>{
                    this.handleClose()
                    window.location.reload()
                },2000)
            }
        }
    }

    handleChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    openBankSetting = ()=>{
        this.props.showBankAccountSetterModal(true)
    }

    keyUp = (event)=> {
        let balance = this.props.user.relations.balance.balance;
        console.log(`Balance ${balance}`)
        let value = event.target.value;
        if (value > balance) {
            this.setState(
                {showBigAmount: true}
            )
        }else {
            this.setState(
                {showBigAmount: false}
            )
        }
    }


    render() {

        const {classes} = this.props
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const {formData} = this.state
        const isEnabled = formData.amount.length>0 && formData.description.length>0
            && formData.bank_id>0
        return (
            <Dialog
                fullScreen={this.state.fullScreen}
                disableBackdropClick={true}
                open={this.props.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}
            >
                <DialogTitle  id="customized-dialog-title" onClose={this.handleClose}>
                    Send your withdrawal requests.
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
                        this.props.response.status
                            ?
                            (
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <Typography
                                        component='h6'
                                        variant='body2' style={{color:green[500]}}>
                                        {this.props.response.message}
                                    </Typography>
                                </div>
                            )
                            :
                            (
                                <Typography
                                    component='h6'
                                    variant='body2' style={{color:red[500]}}>
                                    {this.props.response.message}
                                </Typography>
                            )
                    }

                    {
                        this.props.loading && this.props.userLoading
                        ?
                            (<React.Fragment>
                                <Skeleton variant='rect' width='80%' height={6}/>
                                <Skeleton variant='rect' width='60%' height={6}/>
                                <Skeleton variant='rect' width='40%' height={6}/>
                            </React.Fragment>)
                        :
                            (
                                <ValidatorForm
                                    onSubmit={this.handleSubmit}
                                >
                                    {
                                        this.state.showBigAmount
                                            ?
                                            (
                                                <Typography style={{color:red[500]}}>
                                                    The amount you are entering is bigger than your balance
                                                </Typography>
                                            )
                                            :(null)
                                    }
                                    {
                                        this.props.accounts.length>0
                                        ?
                                            (
                                                <div>
                                                    <FormControl  className={classes.formControl}>
                                                        <InputLabel htmlFor="demo-controlled-open-select">Select bank you will receive your withdraw</InputLabel>
                                                        <Select
                                                            name='bank_id'
                                                            value={this.state.selectValue}
                                                            open={this.state.isSelectOpened}
                                                            onClose={this.handleSelect}
                                                            onOpen={this.handleSelectOpen}
                                                            onChange={this.handleSelectChange}
                                                        >
                                                            {
                                                                this.props.accounts.map(banks=>(
                                                                    <MenuItem key={banks.bank.id} value={banks.id}>{banks.bank.bank_name}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>

                                                    </FormControl>
                                                    <TextValidator
                                                        className={classes.text_input}
                                                        label='amount'
                                                        onKeyUp={this.keyUp}
                                                        onChange={this.handleChange}
                                                        name="amount"
                                                        type='number'
                                                        value={this.state.formData.account_number}
                                                        validators={['required']}
                                                        errorMessages={['Please enter amount you want to withdraw']}
                                                    />

                                                    <TextValidator
                                                        className={classes.text_input}
                                                        label='description'
                                                        onChange={this.handleChange}
                                                        name="description"
                                                        type='text'
                                                        multiline={true}
                                                        rows={4}
                                                        columns={2}
                                                        value={this.state.formData.account_number}
                                                        validators={['required']}
                                                        errorMessages={['Please enter amount you want to withdraw']}
                                                    />
                                                </div>
                                            )
                                        :
                                            (
                                                this.openBankSetting
                                            )
                                    }
                                </ValidatorForm>
                            )
                    }
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        style={{textTransform:'none'}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text='Send withdraw request'
                        disabled={!isEnabled ||this.state.submitted||this.state.showBigAmount}
                        onClick={this.handleSubmit}>
                        Send withdraw request
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        );
    }


}

const mapStateToProps = state=>(
    {
        show: state.authReducer.driversReducers.dialogsData.showWithdrawalRequest,
        accounts:state.authReducer.bankAccountReducer.accounts,
        loading:state.authReducer.bankAccountReducer.loading,
        response: state.authReducer.driversReducers.withdrawalsData.response,
        user:state.userData.user,
        userLoading:state.userData.loading
    }
)

export default connect(mapStateToProps,{showWithdrawalRequestDialog,withdrawalStore,showBankAccountSetterModal})(withStyles(bankDialogstyle)(WithdrawalRequestDialog))