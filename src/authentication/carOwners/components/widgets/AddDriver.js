import React, {Component} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import adminMainDialogStyle from "../../../admin/dialogs/styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {storeDriver} from "../../state/actions/vehicleDriverAction";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import {showMainDialog} from "../../../admin/state/action/dialogAction";

class AddDriver extends Component {
    constructor() {
        super();
        this.state ={
           formData:{
               phone:'',
               email:'',
               car_id:''
           },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    handleSubmit = event=>{
        this.setState({
            submitted: true,
            loading: true
        })
        const {formData} = this.state
        this.props.storeDriver(formData)

    }
    componentDidMount() {
        const {formData} = this.state;
        formData['car_id'] = this.props.car.id
        this.setState(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.response.status){
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

    handleChange = event=>{
        const {formData} =  this.state;
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }
    render() {

        const {classes,t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.phone.length > 0 && formData.email.length

        return (
            <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[600]}}>{this.props.response.message}</Typography>
                <TextValidator
                    className={classes.textInput}
                    name='phone'
                    label='driver phone number'
                    onChange={this.handleChange}
                    value={this.state.formData.phone}
                />

                <TextValidator
                    className={classes.textInput}
                    name='email'
                    label='driver email address'
                    onChange={this.handleChange}
                    value={this.state.formData.email}
                />

                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Add driver'}
                    done={finished}
                >
                    {
                       'Add driver'
                    }
                </LoadingButton>
            </ValidatorForm>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.driversReducers.vehicleDriverReducer.response
})
export default connect(mapStateToProps,{storeDriver,showMainDialog})(withStyles(adminMainDialogStyle)(AddDriver));