import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {showMainDialog} from "../../admin/state/action/dialogAction";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../../admin/dialogs/styles/mainDialogStyle";
import {updatePaymentPercentage} from "../../admin/state/action/PaymentPercentageAction";
import {connect} from "react-redux";
class AddPaymentPercentage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                car_owners_percentage:'',
            }
        }
    }
    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['car_owners_percentage'] = this.props.form.data[0].car_owners_percentage
            this.setState(formData)
        }
    }

    handleChange = event=>{
        const {formData} = this.state;
        formData['car_owners_percentage'] = event.target.value;
        this.setState(formData);
    }

    handleSubmit = event=>{
        event.preventDefault()

        this.setState({
            loading:true,
            submitted:true
        })
        const {formData} = this.state
        this.props.updatePaymentPercentage(formData,this.props.form.data[0].id)
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
        const isEnabled = formData.car_owners_percentage> 0
        return (
            <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextValidator
                    label='Payment percentage'
                    name='car_owners_percentage'
                    onChange={this.handleChange}
                    value={this.state.formData.car_owners_percentage}
                    className={classes.textInput}
                />
                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Update'}
                    done={finished}
                >
                    {
                        'Update'
                    }
                </LoadingButton>

            </ValidatorForm>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducers.paymentPercentageReducer.response
})

export default connect(mapStateToProps,{updatePaymentPercentage,showMainDialog})
(withStyles(adminMainDialogStyle)(AddPaymentPercentage));