import React from 'react'
import {translate} from "react-i18next";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import signup from '../../styles/signup_style'
import {Button, Card, CardContent} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {login} from '../../state/action/authenticationAction'
import {connect} from "react-redux";
import LoadingButton from "./widgets/LoadingButton";
import Typography from "@material-ui/core/Typography";
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            formData:{
                "email":'',
                "password":''
            },
            submitted:false,
            loading:false,
            finished:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        const {formData}=this.state
        formData[e.target.name]=e.target.value
        this.setState(formData)
    }

    handleSubmit(){
        const {formData} = this.state
        const data = JSON.stringify(formData)
        this.setState({
            submitted:true
        })
        this.setState({
            submitted:true,
            loading:true
        })
        this.props.login(data)
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        const {formData}= this.state
        const { loading } = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.email.length >0 && formData.password.length>0
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.login_message')}</h1>
                </div>
                <Container maxWidth='md'>
                    <Card className={classes.form}>
                        <CardContent>
                            <ValidatorForm
                                onSubmit={this.handleSubmit}
                            >
                                <Typography component='p' className={classes.errors}>
                                    {this.props.authenticated.message?t(`home.login.errors.${this.props.authenticated.message.split(' ').join('_').split('.').join('_')}`):''}
                                </Typography>
                                <TextValidator
                                    className={classes.text_input}
                                    label={t('home.login.label.email')}
                                    onChange={this.handleChange}
                                    name="email"
                                    type='email'
                                    value={this.state.formData.email}
                                    validators={['required','isEmail']}
                                    errorMessages={[t('home.login.errors.email'),'is not valid email']}
                                />

                                <TextValidator
                                    className={classes.text_input}
                                    label={t('home.login.label.password')}
                                    onChange={this.handleChange}
                                    name="password"
                                    type='password'
                                    value={this.state.formData.password}
                                    validators={['required']}
                                    errorMessages={[t('home.login.errors.password')]}
                                />
                                <div className={classes.submit_division}>
                                    <LoadingButton
                                        className={classes.signup_button}
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={!isEnabled || this.state.submitted}
                                        loading={setLoading}
                                        text={t('home.login.label.button')}
                                        done={finished}
                                    >
                                        {
                                            t('home.login.label.button')
                                        }
                                    </LoadingButton>
                                    <div className={classes.registered}>
                                        <span style={{marginRight:10}}>{t('home.login.label.not_registered')}</span>
                                        <Link style={{marginRight:10}} to='/signup'>{t('home.Sign up')}</Link>
                                        <div className={classes.forgetters}>
                                            <Divider orientation='vertical' style={{height:20,padding:1,marginRight:10}}/>
                                            <Link style={{marginRight:10}} to='/signup'>{t('home.login.label.forgot_password')}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.smallers}>
                                    <Link  to='/signup'>{t('home.login.label.forgot_password')}</Link>
                                </div>
                            </ValidatorForm>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
}
const  mapStateToProps = state=>(
    {
        authenticated:state.auth.authenticated
    }
)
export default withStyles(signup)(connect(mapStateToProps,{login})(translate('common')(Login)))