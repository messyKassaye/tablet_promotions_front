import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Skeleton from "@material-ui/lab/Skeleton";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import signup from '../../../../home/components/styles/signup_style'
import withStyles from "@material-ui/core/styles/withStyles";
import {fetchRole} from "../../../../home/state/action/roleActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {storeUsers} from "../../state/action/adminUsersAction";
import {showMainDialog} from "../../state/action/dialogAction";
import {green} from "@material-ui/core/colors";

class AddNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                'first_name': '',
                'last_name': '',
                'phone': '',
                'email': '',
                'role_id':'',
                'password': '',
            },
            submitted:false,
            loading:false,
            finished:false
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    generatePassword = ()=>{
        const password = Math.floor(1000 + Math.random() * 9000);
        const {formData}=this.state
        formData['password'] = password.toString()
        this.setState(formData)
    }
    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.storeUsers(formData)

    }

    handleRadionButton = (e)=>{
        const role = this.props.roles.filter(item=>item.name===e.target.value)
        const {formData} = this.state
        formData[e.target.name]=role[0].id
        this.setState(formData)
        console.log(formData)
    }

    componentDidMount() {
        this.props.fetchRole()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
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

    render() {
        const {classes,t} =this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.first_name.length>0&&formData.last_name.length>0 && formData.phone.length>0&&
            formData.email.length>0&&formData.role_id>0&&formData.password.length>0

        return (
            <div>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
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
                        label={t('home.signup.label.phone')}
                        onChange={this.handleChange}
                        name="phone"
                        value={this.state.formData.phone}
                        validators={['required']}
                        errorMessages={[t('home.signup.errors.phone')]}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label={t('home.signup.label.email')}
                        onChange={this.handleChange}
                        name="email"
                        value={this.state.formData.email}
                        validators={['required','isEmail']}
                        errorMessages={[t('home.signup.errors.email'),t('home.signup.errors.isEmail')]}
                    />
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>{t('home.signup.label.register_me_as.label')}</FormLabel>
                        <RadioGroup
                            className={classes.register_me_as}
                            aria-label="gender"
                            name="role_id"
                            onChange={this.handleRadionButton}>
                            {
                                this.props.roles ?this.props.roles.map(item=>(
                                    <FormControlLabel
                                        key={item.name}
                                        value={item.name}
                                        control={<Radio />}
                                        label={t(`home.signup.label.register_me_as.translation.${item.name}`)} />
                                )):  <Skeleton variant="rect" width='100%' height={100} />

                            }
                        </RadioGroup>
                    </FormControl>

                    <Grid container spacing={2}>
                        <Grid item md={7} xs={5}>
                            <TextValidator
                                className={classes.text_input}
                                label={t('home.signup.label.password')}
                                onChange={this.handleChange}
                                name="password"
                                type='text'
                                value={this.state.formData.password}
                                validators={['required']}
                                errorMessages={[t('home.signup.errors.password')]}
                            />
                        </Grid>
                        <Grid item md={5} xs={5} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Button onClick={this.generatePassword} color='primary' variant='contained' style={{textTransform:'none'}}>
                                Generate password
                            </Button>
                        </Grid>
                    </Grid>

                    <LoadingButton
                        style={{width:'100%',marginTop:15}}
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={setLoading}
                        done={finished}
                        text={t('home.signup.label.button')}
                        disabled={!isEnabled ||this.state.submitted}
                    >
                        {
                            t('home.signup.label.button')
                        }
                    </LoadingButton>
                </ValidatorForm>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    roles:state.role.roles,
    response:state.authReducer.adminReducers.adminUsersReducers.response
})

export default connect(mapStateToProps,{fetchRole,storeUsers,showMainDialog})(withStyles(signup)(translate('common')(AddNewUser)));
