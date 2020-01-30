import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "react-avatar-edit";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import settingStyle from "../authstyle/settingStyle";
import {Container, Paper} from "@material-ui/core";
import {me, userUpdate} from "../state/actions/usersActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import ResetPassword from "./components/ResetPassword";
import {set} from "../../TokenService";
import LoadingButton from "../../home/components/widgets/LoadingButton";

class Setting extends React.Component {

    constructor(props) {
        super(props);
        const src = ''
        this.state = {
            formData: {
                'first_name': '',
                'last_name': '',
                'phone': '',
                'email': '',
                'avator': ''
            },
            submitted: false,
            loading: false,
            finished: false,
            change:false,
            preview: null,
            src,
            showEditor: false,
            showChangePassword:false
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
        this.showEditorPanel = this.showEditorPanel.bind(this)
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
            alert("File is too big!");
            elem.target.value = "";
        }
        ;
    }

    handleChange = (e)=>{
        const {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState({
            formData,
            change:true
        })
    }

    handleSubmit = (event) => {
        const {formData} = this.state
        formData['avator'] = this.state.preview === null ? '' : this.state.preview
        console.log(formData)
        //this.props.userUpdate(formData,14)
    }

    showEditorPanel = () => {
        this.setState({
            showEditor: true,
        })
    }

    editProfile = ()=>{
        console.log(this.state.formData)
    }


    loadData = () => {
        const {classes} = this.props
        const {formData} = this.state
        formData['first_name'] = this.props.user.attribute.first_name
        formData['last_name'] = this.props.user.attribute.last_name
        formData['email'] = this.props.user.attribute.email
        formData['phone'] = this.props.user.attribute.phone

        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        return (
            <Container maxWidth={'md'}>
                <Typography component='p' className={classes.text}>Edit your
                    profile</Typography>
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    {
                        <Typography component='p' className={classes.errors}>
                        </Typography>
                    }
                    <TextValidator
                        className={classes.text_input}
                        label='First Name'
                        type='text'
                        onChange={this.handleChange}
                        name="first_name"
                        value={formData.first_name}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label='Last Name'
                        onChange={this.handleChange}
                        name="last_name"
                        type='text'
                        value={formData.last_name}
                    />
                    <TextValidator
                        className={classes.text_input}
                        label='Phone number'
                        onChange={this.handleChange}
                        name="phone"
                        type='number'
                        value={this.state.formData.phone}
                    />

                    <TextValidator
                        className={classes.text_input}
                        label='Email address'
                        onChange={this.handleChange}
                        name="email"
                        type='email'
                        value={this.state.formData.email}
                    />
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={!this.state.change}
                        loading={setLoading}
                        style={{textTransform:'none'}}
                        text={'Edit profile'}
                        done={finished}
                    >
                        {
                            'Edit profile'
                        }
                    </LoadingButton>
                </ValidatorForm>

                <Divider style={{marginTop: 20, marginBottom: 20}}/>
                <ResetPassword/>
            </Container>
        )
    }

    render() {
        const {classes} = this.props

        return (
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item md={4} sm={12}>
                        <Paper className={classes.paper}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {
                                        this.state.showEditor
                                            ?
                                            ''
                                            :
                                            (<Button
                                                color='primary'
                                                variant='outlined'
                                                onClick={this.showEditorPanel}
                                            >
                                                <span>Change profile </span>
                                            </Button>)
                                    }
                                </div>
                                {
                                    this.state.showEditor
                                        ?
                                        (
                                            <Avatar
                                                width={350}
                                                height={295}
                                                onCrop={this.onCrop}
                                                onClose={this.onClose}
                                                onBeforeFileLoad={this.onBeforeFileLoad}
                                                src={this.state.src}
                                            />
                                        )
                                        : ''
                                }
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {
                                        this.state.preview === null
                                            ?
                                            ('')
                                            :
                                            (
                                                <img src={this.state.preview} alt="Preview"/>
                                            )
                                    }
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item md={8} sm={12}>
                        <Paper style={{padding: 20}}>
                            {
                                this.props.loading
                                    ?
                                    (
                                        <React.Fragment>
                                            <Skeleton className={classes.skeleton} variant='text' width='40%' height={20}/>
                                            <Skeleton className={classes.skeleton} variant='rect' width='80%' height={20}/>
                                            <Skeleton className={classes.skeleton} variant='rect' width='80%' height={20}/>
                                            <Skeleton className={classes.skeleton} variant='rect' width='80%' height={20}/>
                                            <Skeleton className={classes.skeleton} variant='rect' width='80%' height={20}/>
                                        </React.Fragment>
                                    )
                                    :
                                    (
                                        <div>
                                            {this.loadData()}
                                        </div>
                                    )
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }


}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading
})

export default withStyles(settingStyle)(connect(mapStateToProps, {me, userUpdate})(Setting))
