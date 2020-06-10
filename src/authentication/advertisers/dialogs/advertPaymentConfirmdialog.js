import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import {connect} from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import bankDialogstyle from "../../carOwners/style/dialogs";
import {showAdvertPaymentConfirmDialog} from "../state/action/advertiserDialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import dialogStyle from "./style/dialogsStyle";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {storeBankTransaction} from "../state/action/advertPaymentTransactionAction";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GreenRadio = withStyles({
    root: {
        color: 'default',
        '&$checked': {
            color: deepPurple[500],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);

class AdvertPaymentConfirmDialog extends React.Component{

    constructor(props) {
        super(props);
        const src = ''
        this.state = {
            open:false,
            fullScreen: false,
            isSelectOpened:false,
            selectValue:'',
            formData:{
                "bank_id":'',
                "advert_id":'',
                "deposited_by_name":'',
                "transaction_ref_number":'',
                "transaction_date":'',
                "receipt_image":''
            },
            fileName: '',
            src,
            submitted:false,
            loading:false,
        }

        this.handleCloe = this.handleCloe.bind(this)

    }

    handleCloe = ()=>{
        this.props.showAdvertPaymentConfirmDialog({'show':false,'advert_id':''})
    }

    handleFileChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState({fileName:event.target.files[0].name})
        this.setState(formData)
    }

    handleChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        formData['advert_id']=this.props.confirmData.advert_id
        this.setState(formData)
    }

    handleBankChange = (event)=>{
        let selectedBank = this.props.banks.filter(bank=>bank.abbreviation===event.target.value);
        const {formData} = this.state
        formData[event.target.name] = selectedBank[0].id
        this.setState(formData)
    }


    handleSubmit = ()=>{
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.storeBankTransaction(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response){
            this.setState({
                loading:false,
                finished:true,
                submitted:false
            })
        }
    }


    render() {
        const {classes} = this.props
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const {formData} = this.state
        const isEnabled = formData.deposited_by_name.length>0&&formData.transaction_ref_number.length>0
                          &&formData.transaction_date.length>0&&formData.bank_id>0&&formData.receipt_image.length>0
        return (
            <Dialog
                fullScreen={this.state.fullScreen}
                disableBackdropClick={true}
                open={this.props.confirmData.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}
            >
                <DialogTitle  id="customized-dialog-title" onClose={this.handleCloe}>
                    Payment confirmation
                    <IconButton
                        className={classes.closeButton}
                        color='inherit'
                        aria-label='close dialog'
                        onClick={this.handleCloe}
                        edge='end'>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                    >
                    {
                        this.props.banksLoading
                            ?
                            (
                                <CircularProgress/>
                            )
                            :
                            (
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    {
                                        this.props.transactionLoading
                                        ?
                                            (
                                                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                                            )
                                        :''

                                    }
                                    <FormControl component='fieldset'>
                                        <FormLabel component='legend'>Select by which bank you send the money for us</FormLabel>
                                        <RadioGroup
                                            className={classes.groups}
                                            aria-label="bank"
                                            name="bank_id"
                                            onChange={this.handleBankChange}>
                                            {
                                                this.props.banks.map(item=>(
                                                    <FormControlLabel
                                                        key={item.id}
                                                        value={item.abbreviation}
                                                        control={<GreenRadio />}
                                                        label={item.abbreviation} />
                                                ))

                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )
                    }
                        <TextValidator
                            className={classes.text_input}
                            label={'Deposited by name'}
                            onChange={this.handleChange}
                            name="deposited_by_name"
                            value={this.state.formData.deposited_by_name}
                            validators={['required']}
                            errorMessages={['Please enter deposited by name']}
                        />

                        <TextValidator
                            className={classes.text_input}
                            label={'Transaction ref number'}
                            onChange={this.handleChange}
                            name="transaction_ref_number"
                            value={this.state.formData.transaction_ref_number}
                            validators={['required']}
                            errorMessages={['Please enter transaction reference number']}
                        />

                        <TextValidator
                            className={classes.text_input}
                            label={'Transaction date shown on receipt'}
                            onChange={this.handleChange}
                            name="transaction_date"
                            value={this.state.formData.transaction_date}
                            validators={['required']}
                            errorMessages={['Please enter transaction date']}
                        />
                        <Typography>Please take a picture of the receipt which the bank gives you and send us.</Typography>
                                    <div>
                                        <input
                                            accept="image/*"
                                            name='receipt_image'
                                            onChange={this.handleFileChange}
                                            className={classes.input}
                                            id="outlined-button-file"
                                            type="file"
                                        />
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                            <label htmlFor="outlined-button-file">
                                                <Button variant="outlined" component="span" className={classes.button}>
                                                    Upload
                                                </Button>
                                            </label>
                                            <Typography style={{marginLeft:10}}>{this.state.fileName}</Typography>
                                        </div>
                                    </div>
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
    confirmData:state.authReducer.advertisersReducers.dialogsData.showAdvertPaymentConfirmDialog,
    banks:state.authReducer.advertisersReducers.banksData.banks,
    banksLoading:state.authReducer.advertisersReducers.banksData.loading,
    response:state.authReducer.advertisersReducers.advertPaymentConfirmation.response,
    transactionLoading:state.authReducer.advertisersReducers.advertPaymentConfirmation.loading
})

export default connect(mapStateToProps,{showAdvertPaymentConfirmDialog,storeBankTransaction})(withStyles(dialogStyle)(AdvertPaymentConfirmDialog))