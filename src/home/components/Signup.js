import React,{useEffect,useRef} from 'react'
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {Card, CardContent} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {fetchRole} from '../../state/action/roleActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import withStyles from "@material-ui/core/styles/withStyles";
import signup from '../../styles/signup_style'
import {Link} from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import {signUp} from '../../state/action/authenticationAction'

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
             submitted: false
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
         const data = JSON.stringify(formData)
         this.props.signUp(data)
     }
     render() {
         const { t } = this.props
         const {classes} =this.props
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
                                             this.props.roles.map(item=>(
                                                 <FormControlLabel
                                                     key={item.name}
                                                     value={item.name}
                                                     control={<Radio />}
                                                     label={t(`home.signup.label.register_me_as.translation.${item.name}`)} />
                                             ))
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
                                         <Button
                                             className={classes.signup_button}
                                             color="primary"
                                             variant="contained"
                                             type="submit"
                                             disabled={this.state.submitted}
                                         >
                                             {
                                                 (this.state.submitted && 'Your form is submitted!')
                                                 || (!this.state.submitted && t('home.signup.label.button'))
                                             }
                                         </Button>
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
             roles:state.role.roles
         }
     )

export default  withStyles(signup)(translate('common')(connect(mapStateToProps,{fetchRole,signUp})(Signup)))