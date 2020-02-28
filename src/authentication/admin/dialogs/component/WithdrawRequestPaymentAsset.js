import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import {storeBase64} from "../../state/action/base64Action";
import {connect} from "react-redux";
import {storeWithdrawAssets} from "../../state/action/WithdrawalAssetsAction";
import {showMainDialog} from "../../state/action/dialogAction";
import {green} from "@material-ui/core/colors";

class WithdrawRequestPaymentAsset extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            formData:{
                withdrawal_id:'',
                asset_path:'',
                description:''
            },
            submitted: false,
            loading: false,
            finished: false,
            selectedFile: null,
        }

        this.handleFileInput = this.handleFileInput.bind(this)
    }

    handleChange = (event) => {
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }
    handleFile = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.props.storeBase64(formData)
    }

    handleFileInput() {
        this.inputFile.current.click();
    }

    cancelImage = ()=>{
        const {formData} = this.state
        formData['asset_path'] = ''
        this.setState({
            selectedFile:null,
            formData
        })
    }

    componentDidMount() {
        const {formData} = this.state
        formData['withdrawal_id'] = this.props.withdraws.id
        this.setState(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.base64Response.status) {
            const {formData} = this.state
            formData['asset_path'] = nextProps.base64Response.data
            this.setState({
                selectedFile: nextProps.base64Response.data,
                formData
            })
            //console.log(nextProps.base64Response)
        }

        if (nextProps.withdrawResponse.status) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            setTimeout(()=>{
                window.location.reload()
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            submitted: true,
            loading: true
        })
        const {formData} = this.state
        this.props.storeWithdrawAssets(formData)
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.withdrawal_id>0 && formData.asset_path.length>0 && formData.description.length >0

        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.withdrawResponse.message}</Typography>
                {
                    this.state.selectedFile == null
                        ?
                        (
                            <div className={classes.logo_picker}>
                                <Typography>{`Asset image`}</Typography>
                                <input
                                    onChange={this.handleFile}
                                    ref={this.inputFile}
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

                <TextField
                    className={classes.textInput}
                    onChange={this.handleChange}
                    name='description'
                    placeholder={'Description'}
                    value={this.state.formData.description}
                />
                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Send asset'}
                    done={finished}
                >
                    {
                        'Send asset'
                    }
                </LoadingButton>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    response: state.authReducer.adminReducers.bankReducer.response,
    base64Response: state.authReducer.adminReducers.base64.base64Response,
    withdrawResponse:state.authReducer.adminReducers.withdrawAssetsReducer.response
})

export default connect(mapStateToProps,{storeBase64,storeWithdrawAssets,showMainDialog})
(withStyles(adminMainDialogStyle)(WithdrawRequestPaymentAsset));