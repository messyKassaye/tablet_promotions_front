import React from 'react'
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {Card, CardContent} from "@material-ui/core";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {fetchRole} from '../state/action/roleActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import withStyles from "@material-ui/core/styles/withStyles";
import signup from '../../styles/signup_style'
import {Link} from 'react-router-dom'
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import {signUp} from '../state/action/authenticationAction'
import LoadingButton from "./widgets/LoadingButton";
import AppConsumer from "../../context/AppConsumer";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {API_AUTH_URL} from "../../constants/constants";
import {set, setRole} from "../../TokenService";
import Skeleton from "@material-ui/lab/Skeleton";
 class Signup extends React.Component{

     constructor(props){
         super(props)
         this.state = {
             formData: {
                 'first_name': '',
                 'last_name': '',
                 'phone': '',
                 'email': '',
                 'role_id':'',
                 'password': '',
                 'repeatPassword':''
             },
             submitted:false,
             loading:false,
         }
         this.handleChange = this.handleChange.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.handleRadionButton = this.handleRadionButton.bind(this)
     }
     componentDidMount() {
         this.props.fetchRole()
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


     handleChange(e){
        const {formData} = this.state
         formData[e.target.name]=e.target.value
         this.setState(formData)
     }
     handleRadionButton(e){
         const role = this.props.roles.filter(item=>item.name===e.target.value)
         const {formData} = this.state
         formData[e.target.name]=role[0].id
         this.setState(formData)
     }
     handleSubmit(){
         const {formData} = this.state
         this.setState({
             submitted:true,
             loading:true
         })
         axios.post(`${API_AUTH_URL}signup`,formData,{
             headers:{
                 'content-type':'Application/json'
             }
         })
             .then((res)=>res.data)
             .then((response)=> {
                 set(response.token)
                 setRole(JSON.stringify(response.role))
                 this.props.go('Authenticated')
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
         const { t } = this.props
         const {classes} =this.props
         const {formData} = this.state
         const { loading } = this.state;
         const finished = false
         const setLoading = !finished && loading;
         const isEnabled = formData.first_name.length>0&&formData.last_name.length>0 && formData.phone.length>0&&
             formData.email.length>0&&formData.role_id>0&&formData.password.length>0&&formData.repeatPassword.length>0
         return (
             <div>
                 <div className={classes.jumbotron}>
                     <h1>{t('home.signup_message')}</h1>
                 </div>
                 <Container maxWidth='md'>
                     <Card className={classes.form}>
                         <CardContent>
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


                                     <div className={classes.submit_division}>
                                         <LoadingButton
                                             className={classes.signup_button}
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
                                         <div className={classes.registered}>
                                             <span style={{marginRight:10}}>{t('home.registered')}</span>
                                             <Link to='/login'>{t('home.Login')}</Link>
                                         </div>
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
             roles:state.role.roles,
             authenticationError: state.auth.authenticationError
         }
     )

export default  AppConsumer(withStyles(signup)(translate('common')(connect(mapStateToProps,{fetchRole,signUp})(Signup))))