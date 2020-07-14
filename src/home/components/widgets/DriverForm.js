import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoadingButton from "./LoadingButton";
import withStyles from "@material-ui/core/styles/withStyles";
import signup from '../styles/signup_style'
import {translate} from "react-i18next";
import axios from "axios";
import {API_AUTH_URL} from "../../../constants/constants";
import {set, setRole} from "../../../TokenService";
import {withRouter} from 'react-router-dom'
class DriverForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                'first_name': '',
                'last_name': '',
                'password': '',
                'verification_code':'',
                'repeatPassword':''
            },
            submitted:false,
            loading:false,
        }
    }

    componentDidMount() {
        const {formData} = this.state
        formData['verification_code'] = this.props.id
        this.setState(formData)
        ValidatorForm.addValidationRule('isEmail',(value)=>{
            if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                return false
            }
            return true
        })
        ValidatorForm.addValidationRule('isPasswordMatch',(value)=>{
            const {formData}= this.state
            if(value !== formData.password){
                return false
            }
            return  true
        })
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = (e)=>{
        const {formData} = this.state
        formData[e.target.name]=e.target.value
        this.setState(formData)
    }
    handleSubmit = ()=>{
        const {formData} = this.state
        console.log(formData)
        this.setState({
            submitted:true,
            loading:true
        })

        axios.post(`${API_AUTH_URL}driver_signup`,formData,{
            headers:{
                'content-type':'Application/json'
            }
        })
            .then((res)=>res.data)
            .then((response)=> {
                set(response.token)
                setRole(JSON.stringify(response.role))
                this.props.history.push('/auth')
            })
            .catch(onerror=>{
                if(!onerror.status){
                    this.setState({errorMessage:'networkError'})
                }else {
                    let code = onerror.response.status
                    if(code===409){
                        this.setState({errorMessage:onerror.response.data.message})
                    }
                    this.setState({
                        loading:false,
                        finished:true,
                        submitted:false
                    })
                }
            })

    }
    render() {
        const {classes,t} = this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.first_name.length>0&&formData.last_name.length>0
            &&formData.password.length>0&&formData.repeatPassword.length>0

        return (
            <div>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    {
                        <Typography component='p' className={classes.errors}>
                            {this.state.errorMessage?t(`home.signup.errors.${this.state.errorMessage.toLowerCase().split(' ').join('_').split('.').join('_')}`):''}
                        </Typography>
                    }
                    <TextValidator
                        className={classes.text_input}
                        label={t('home.signup.label.first_name')}
                        onChange={this.handleChange}
                        name="first_name"
                        value={this.state.formData.first_name}
                        validators={['required']}
                        errorMessages={[t('home.signup.errors.first_name')]}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label={t('home.signup.label.last_name')}
                        onChange={this.handleChange}
                        name="last_name"
                        value={this.state.formData.last_name}
                        validators={['required']}
                        errorMessages={[t('home.signup.errors.last_name')]}
                    />
                    <TextValidator
                        className={classes.text_input}
                        label={t('home.signup.label.password')}
                        onChange={this.handleChange}
                        name="password"
                        type='password'
                        value={this.state.formData.password}
                        validators={['required']}
                        errorMessages={[t('home.signup.errors.password')]}
                    />
                    <TextValidator
                        className={classes.text_input}
                        label={t('home.signup.label.repeatPassword')}
                        onChange={this.handleChange}
                        name="repeatPassword"
                        type='password'
                        value={this.state.formData.repeatPassword}
                        validators={['required','isPasswordMatch']}
                        errorMessages={[t('home.signup.errors.password'),t('home.signup.errors.passwordNotMatched')]}
                    />
                    <LoadingButton
                        style={{width:'100%',textTransform:'none'}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={t('home.signup.label.driver_form')}
                        disabled={!isEnabled ||this.state.submitted}
                    >
                        {
                            t('home.signup.label.driver_form')
                        }
                    </LoadingButton>
                </ValidatorForm>
            </div>
        );
    }
}

export default withRouter(translate('common')(withStyles(signup)(DriverForm)));