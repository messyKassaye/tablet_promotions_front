import React, {Component} from 'react';
import {connect} from "react-redux";
import {storeCurrency,updateCurrency} from "../../state/action/currencyAction";
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import {Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {showMainDialog} from "../../state/action/dialogAction";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";

class AddNewCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                name:'',
                symbol:''
            }
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()

        this.setState({
            loading:true,
            submitted:true
        })
        const {formData} = this.state

        if(this.props.form.type==='Edit'){
            this.props.updateCurrency(formData,this.props.form.data.id)
        }else {
            this.props.storeCurrency(formData)
        }

    }

    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['name'] = this.props.form.data.name
            formData['symbol'] = this.props.form.data.symbol
            this.setState(formData)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading:false,
                submitted:false
            })

            setTimeout(()=>{
                this.props.showMainDialog({
                    show:false,
                    page:null,
                    title:'',
                    actions:{
                        on:false,
                        path:'',
                        id:''
                    }
                })
                window.location.reload()
            },200)
        }
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.symbol.length > 0
        return (
            <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextValidator
                 label='Currency name'
                 name='name'
                 onChange={this.handleChange}
                 value={this.state.formData.name}
                 className={classes.textInput}
                />

                <TextValidator
                    label='Currency symbol'
                    name='symbol'
                    onChange={this.handleChange}
                    value={this.state.formData.symbol}
                    className={classes.textInput}
                />

                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Register'}
                    done={finished}
                >
                    {
                        'Register'
                    }
                </LoadingButton>
                
            </ValidatorForm>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducers.currenciesReducer.response
})

export default withStyles(adminMainDialogStyle)(connect(mapStateToProps,{storeCurrency,updateCurrency,showMainDialog})(AddNewCurrency));