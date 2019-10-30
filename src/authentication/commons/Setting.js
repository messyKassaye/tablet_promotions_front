import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "react-avatar-edit";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import settingStyle from "../authstyle/settingStyle";
import {Paper} from "@material-ui/core";
import {me, userUpdate} from "../state/actions/usersActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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
            preview: null,
            src,
            showEditor: false
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
        this.handleChange = this.handleChange.bind(this)
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

    handleChange(e) {
        const {formData} = this.state
        formData[e.target.name] = e.target.defaultValue
        this.setState(formData)
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


    render() {
        const {classes} = this.props
        const formData = []
        const object = {}
        if (this.props.loading) {

        } else {
            this.props.user.map(user => {
                object['id'] = user.attribute.id
                object['first_name'] = user.attribute.first_name
                object['last_name'] = user.attribute.last_name
                object['email'] = user.attribute.email
                object['phone'] = user.attribute.phone
                this.state.preview = user.attribute.avator
            })
            formData.push(object)
        }

        return (
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
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
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
                                                value={formData[0].first_name}
                                            />

                                            <TextValidator
                                                className={classes.text_input}
                                                label='Last Name'
                                                onChange={this.handleChange}
                                                name="last_name"
                                                type='text'
                                                value={formData[0].last_name}
                                            />
                                            <TextValidator
                                                className={classes.text_input}
                                                label='Phone number'
                                                onChange={this.handleChange}
                                                name="phone"
                                                type='number'
                                                value={formData[0].phone}
                                            />

                                            <TextValidator
                                                className={classes.text_input}
                                                label='Email address'
                                                onChange={this.handleChange}
                                                name="email"
                                                type='email'
                                                value={formData[0].email}
                                            />
                                            <Button type='submit' color='primary' variant='contained'>Edit
                                                profile</Button>
                                        </ValidatorForm>

                                        <Divider style={{marginTop:20,marginBottom:20}}/>
                                        <Button color='primary' variant='outlined'>Change password</Button>
                                    </div>
                                )
                        }
                    </Paper>
                </Grid>
            </Grid>
        );
    }


}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading
})

export default withStyles(settingStyle)(connect(mapStateToProps, {me, userUpdate})(Setting))