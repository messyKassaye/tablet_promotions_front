import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {showCarRegistrationModal} from "../state/actions/dialogActions";
import {showBankAccountSetterModal} from "../state/actions/dialogActions";
import {connect} from "react-redux";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import withStyles from "@material-ui/core/styles/withStyles";
import bankDialogstyle from "../style/dialogs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import DialogActions from "@material-ui/core/DialogActions";
import {storeBank} from "../../state/actions/bankAccountAction";
import {Typography} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class BankRegistrationDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            fullScreen: false,
            isSelectOpened:false,
            selectValue:'',
            formData:{
                bank_id:'',
                account_number:'',
                account_holder_full_name:''
            },
            submitted:false,
            loading:false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

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
    handleSelectChange =(event)=>{
        this.setState({
            selectValue:event.target.value
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleClose = ()=>{
       this.props.showBankAccountSetterModal(false)
    }

    handleChange = (event)=>{
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
        this.props.storeBank(formData)
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
                },2000)
            }
        }
    }

    render() {

        const {classes} = this.props
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const {formData} = this.state
        const isEnabled = formData.account_number.length>0 && formData.account_holder_full_name.length>0
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
                    Setting your bank account.
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
                                <Typography
                                    component='h6'
                                    variant='body2' style={{color:green[500]}}>
                                    {this.props.response.message}
                                </Typography>
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
                    <ValidatorForm
                    onSubmit={this.handleSubmit}
                    >
                        <FormControl  className={classes.formControl}>
                            <InputLabel htmlFor="demo-controlled-open-select">Select transport Service type</InputLabel>
                            <Select
                                name='bank_id'
                                value={this.state.selectValue}
                                open={this.state.isSelectOpened}
                                onClose={this.handleSelect}
                                onOpen={this.handleSelectOpen}
                                onChange={this.handleSelectChange}
                            >
                                {
                                    this.props.banks.map(banks=>(
                                        <MenuItem key={banks.bank_name} value={banks.id}>{banks.bank_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>


                        <TextValidator
                            className={classes.text_input}
                            label='Account number'
                            onChange={this.handleChange}
                            name="account_number"
                            type='number'
                            value={this.state.formData.account_number}
                            validators={['required']}
                            errorMessages={['Please enter your account number']}
                        />

                        <TextValidator
                            className={classes.text_input}
                            label='Account holder full name'
                            onChange={this.handleChange}
                            name="account_holder_full_name"
                            type='text'
                            value={this.state.formData.account_holder_full_name}
                            validators={['required']}
                            errorMessages={['Please enter account holder name']}
                        />
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text='Register'
                        disabled={!isEnabled ||this.state.submitted}
                        onClick={this.handleSubmit}>
                        Save car
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        );
    }


}

const mapStateToProps = state=>({
    show: state.authReducer.driversReducers.dialogsData.showBankSetter,
    banks: state.authReducer.banksReducer.banks,
    response: state.authReducer.banksReducer.response
})

export default withStyles(bankDialogstyle)
(connect(mapStateToProps,{showBankAccountSetterModal,storeBank})(BankRegistrationDialog))