import React, {Component} from 'react';
import adminMainDialogStyle from "../../admin/dialogs/styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {commonBanksFetch} from "../state/actions/commonBanksAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {translate} from "react-i18next";
import {storeBase64} from "../../admin/state/action/base64Action";
import {commonStoreBankTransaction} from "../state/actions/commonAdvertPaymentTransactionAction";

class AdvertPaymentInformation extends Component {
    constructor(props) {
        super(props);
        this.receiptInputFile = React.createRef();
        this.state = {
            formData:{
                bank_id:0,
                advert_id:0,
                deposited_by_name: '',
                transaction_ref_number: '',
                transaction_date: '',
                receipt_image: ''
            },
            isBankSelected:false,
            bankValue:'',
            submitted: false,
            loading: false,
            finished: false,
            selectedFile: null,
        }
    }

    handleBankSelect = () => {
        this.setState({
            isBankSelected: false
        })
    }

    handleBankSelectOpen = () => {
        this.setState({
            isBankSelected: true
        })
    }

    handleBankSelectChange = (event) => {
        this.setState({
            bankValue: event.target.value,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)

    }

    componentDidMount() {
        this.props.commonBanksFetch()
        const {formData} = this.state
        formData['advert_id'] = this.props.advert.id
        this.setState(formData)
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleFile = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.props.storeBase64(formData)
    }

    handleFileInput = ()=>{
        this.receiptInputFile.current.click();
    }

    cancelImage = ()=>{
        const {formData} = this.state
        formData['receipt_image'] = ''
        this.setState({
            selectedFile:null,
            formData
        })
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.commonStoreBankTransaction(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.base64Response) {
            const {formData} = this.state
            formData['receipt_image'] = nextProps.base64Response.data
            this.setState({
                selectedFile: nextProps.base64Response.data,
                formData
            })
            //console.log(nextProps.base64Response)
            if (nextProps.response.status) {
                this.setState({
                    loading: false,
                    finished: false,
                    submitted: false,
                })
                /*setTimeout(()=>{
                    this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
                },2000)*/
            }
        }
    }

    render() {
        const {classes,t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.bank_id > 0 && formData.deposited_by_name.length > 0&&
            formData.transaction_ref_number.length>0&&formData.transaction_date.length>0


        return (
            <div>
                {
                    this.props.response.status
                    ?
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <Typography gutterBottom>{`Your payment will be processed.
                                 After we cross check your payment for your advert we will allow you to upload your advert media and we will release it to air.`}
                                </Typography>
                                <Typography gutterBottom>Thank you.</Typography>
                            </div>
                        )
                    :
                        (

                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                                {
                                    this.props.loading
                                        ?
                                        (
                                            <Skeleton width='100%' height={50} style={{backgroundColor:grey[500]}}/>
                                        )
                                        :
                                        (
                                            <FormControl className={classes.textInput}>
                                                <InputLabel
                                                >{'Select the bank where you sent the Money'}</InputLabel>
                                                <Select
                                                    name='bank_id'
                                                    value={this.state.bankValue}
                                                    open={this.state.isBankSelected}
                                                    onClose={this.handleBankSelect}
                                                    onOpen={this.handleBankSelectOpen}
                                                    onChange={this.handleBankSelectChange}
                                                >
                                                    {
                                                        this.props.banks.map(items => (
                                                            <MenuItem key={items.bank_name} value={items.id}
                                                                      name={items.bank_name}>{items.bank_name}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                }


                                <TextField
                                    name='deposited_by_name'
                                    placeholder='Deposited by name E.g Mahder Girma'
                                    onChange={this.handleChange}
                                    className={classes.textInput}
                                    value={this.state.deposited_by_name}
                                />

                                <TextField
                                    name='transaction_ref_number'
                                    placeholder='Transaction Ref number'
                                    onChange={this.handleChange}
                                    className={classes.textInput}
                                    value={this.state.transaction_ref_number}
                                />

                                <TextField
                                    name='transaction_date'
                                    placeholder='Transaction date'
                                    onChange={this.handleChange}
                                    className={classes.textInput}
                                    value={this.state.transaction_date}
                                />

                                {
                                    this.state.selectedFile == null
                                        ?
                                        (
                                            <div className={classes.logo_picker}>
                                                <Typography>{'Please send us the receipt image'}</Typography>
                                                <input
                                                    onChange={this.handleFile}
                                                    ref={this.receiptInputFile}
                                                    style={{display: 'none'}}
                                                    accept="image/*"
                                                    id="outlined-button-file"
                                                    type="file"
                                                />
                                                <label>
                                                    <Button variant="outlined" component="span" onClick={this.handleFileInput}>
                                                        Upload
                                                    </Button>
                                                </label>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className={classes.images}>
                                                <img src={this.state.selectedFile} className={classes.logo}/>
                                                <Button variant='text' color='primary' onClick={this.cancelImage}>cancel</Button>
                                            </div>
                                        )
                                }

                                <LoadingButton
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={!isEnabled || this.state.submitted}
                                    loading={setLoading}
                                    text={t('dialog.addNewBank.addNewBakButton')}
                                    done={finished}
                                >
                                    {
                                        t('dialog.addNewBank.addNewBakButton')
                                    }
                                </LoadingButton>

                            </form>
                        )
                }
            </div>

        );
    }

}
const mapStateToProps = state=>({
    loading:state.authReducer.commonReducer.commonBanks.loading,
    banks:state.authReducer.commonReducer.commonBanks.commonBanks,
    base64Response: state.authReducer.adminReducers.base64.base64Response,
    response:state.authReducer.commonReducer.commonAdvertPaymentTransactionReducers.response
})

export default connect(mapStateToProps,{commonBanksFetch,storeBase64,commonStoreBankTransaction})
(withStyles(adminMainDialogStyle)(translate('common')(AdvertPaymentInformation)));
