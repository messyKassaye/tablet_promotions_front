import React from 'react'
import {translate} from "react-i18next";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import signup from '../../styles/signup_style'
import {Card, CardContent} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LoadingButton from "./widgets/LoadingButton";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withRouter } from 'react-router-dom'
import {API_AUTH_URL} from "../../constants/constants";
import {set, setRole} from "../../TokenService";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {
                "email": '',
                "password": ''
            },
            submitted: false,
            loading: false,
            finished: false,
            errorMessage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        const {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState(formData)
    }

    handleSubmit() {
        const {formData} = this.state
        this.setState({
            submitted: true,
            loading: true
        })
        axios.post(`${API_AUTH_URL}login`, formData, {
            headers: {
                'content-type': 'Application/json'
            },
            timeout:1000*5,
        })
            .then((res) => res.data)
            .then((response) => {
                set(response.token)
                setRole(JSON.stringify(response.role))
                setTimeout(()=>{
                    this.props.history.push('/auth')
                },2000)
            })
            .catch(onerror=>{
                if(!onerror.status){
                    this.setState({errorMessage:'networkError'})
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }else {
                    let code = onerror.response.status
                    if(code===403){
                        this.setState({errorMessage:'Unauthorized user'})
                    }
                    this.setState({
                        loading: false,
                        finished: false,
                        submitted: false,
                    })
                }

            })
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.email.length > 0 && formData.password.length > 0
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
                                {
                                    <Typography component='p' className={classes.errors}>
                                    {this.state.errorMessage ? t(`home.login.errors.${this.state.errorMessage}`) : ''}
                                    </Typography>
                                }
                                <TextValidator
                                    className={classes.text_input}
                                    label={t('home.login.label.email')}
                                    onChange={this.handleChange}
                                    name="email"
                                    type='email'
                                    value={this.state.formData.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[t('home.login.errors.email'), 'is not valid email']}
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
                                        <span style={{marginRight: 10}}>{t('home.login.label.not_registered')}</span>
                                        <Link style={{marginRight: 10}} to='/signup'>{t('home.Sign up')}</Link>
                                        <div className={classes.forgetters}>
                                            <Divider orientation='vertical'
                                                     style={{height: 20, padding: 1, marginRight: 10}}/>
                                            <Link style={{marginRight: 10}}
                                                  to='/signup'>{t('home.login.label.forgot_password')}</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.smallers}>
                                    <Link to='/signup'>{t('home.login.label.forgot_password')}</Link>
                                </div>
                            </ValidatorForm>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default withRouter(withStyles(signup)(translate('common')(Login)))
