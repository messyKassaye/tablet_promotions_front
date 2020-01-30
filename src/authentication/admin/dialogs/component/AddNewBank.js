import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import {translate} from "react-i18next";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {storeBank,updateBank} from "../../state/action/AdminBankAction";
import {storeBase64} from "../../state/action/base64Action";
import {showMainDialog} from "../../state/action/dialogAction";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";

class AddNewBank extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state = {
            formData: {
                bank_name: '',
                logo_path: '',
                abbreviation:''
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
        formData['logo_path'] = ''
        this.setState({
            selectedFile:null,
            formData
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            submitted: true,
            loading: true
        })
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            this.props.updateBank(formData,this.props.form.data.id)
        }else {
            const {formData} = this.state
            this.props.storeBank(formData)
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.base64Response.status) {
            const {formData} = this.state
            formData['logo_path'] = nextProps.base64Response.data
            this.setState({
                selectedFile: nextProps.base64Response.data,
                formData
            })
            //console.log(nextProps.base64Response)
        }

        if (nextProps.response.status) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
          setTimeout(()=>{
              this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
          },2000)
        }
    }

    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData}= this.state
            formData['bank_name']= this.props.form.data.bank_name
            formData['logo_path'] = this.props.form.data.logo_path
            formData['abbreviation'] = this.props.form.data.abbreviation
            this.setState(
                {
                    formData,
                    selectedFile: this.props.form.data.logo_path
                })
        }
    }


    render() {
        const {classes, t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.bank_name.length>0 && formData.abbreviation.length>0 && formData.logo_path.length >0
        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color: green[500], textAlign: 'center'}}>{this.props.response.message}</Typography>
                <TextField
                    className={classes.textInput}
                    onChange={this.handleChange}
                    name='bank_name'
                    placeholder={'Bank name'}
                    value={this.state.formData.bank_name}
                />
                <TextField
                    className={classes.textInput}
                    onChange={this.handleChange}
                    name='abbreviation'
                    placeholder={'abbreviation'}
                    value={this.state.formData.abbreviation}
                />
                {
                    this.state.selectedFile == null
                        ?
                        (
                            <div className={classes.logo_picker}>
                                <Typography>{t('dialog.addNewBank.logo_label')}</Typography>
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
        );
    }
}

const mapStateToProps = state => ({
    response: state.authReducer.adminReducers.bankReducer.response,
    base64Response: state.authReducer.adminReducers.base64.base64Response
})

export default connect(mapStateToProps, {storeBank,updateBank,showMainDialog, storeBase64})
(translate('common')(withStyles(adminMainDialogStyle)(AddNewBank)));
