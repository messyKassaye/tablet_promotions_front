import React, {Component} from 'react';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import adminMainDialogStyle from "../styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {connect} from "react-redux";
import {storePlaces,updatePlaces} from "../../state/action/adminPlaceAction";
import {Typography} from "@material-ui/core";
import {showMainDialog} from "../../state/action/dialogAction";
import {green} from "@material-ui/core/colors";

class AddNewPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                country:'',
                city:'',
                latitude:0.0,
                longtude:0.0
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()

        this.setState({
            loading:true,
            submitted:true
        })
        const {formData} = this.state

        if(this.props.form.type==='Edit'){
            this.props.updatePlaces(formData,this.props.form.data.id)
        }else {
            this.props.storePlaces(formData)
        }


    }
    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['country'] = this.props.form.data.country
            formData['city'] = this.props.form.data.city
            formData['latitude'] = this.props.form.data.latitude
            formData['longtude'] = this.props.form.data.longtude
            this.setState(formData)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading:true,
                submitted:true
            })


            setTimeout(()=>{
                window.location.reload()
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
            },2000)
        }
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.country.length > 0 &&formData.city.length > 0
        return (
            <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextValidator
                 name={'country'}
                 label={'Country'}
                 value={this.state.formData.country}
                 onChange={this.handleChange}
                 className={classes.textInput}
                />

                <TextValidator
                    name={'city'}
                    label={'City'}
                    value={this.state.formData.city}
                    onChange={this.handleChange}
                    className={classes.textInput}
                />

                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Register'}
                    done={finished}
                >
                    {
                        'Register'
                    }
                </LoadingButton>

            </ValidatorForm>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducers.adminPlacesReducer.response
})

export default connect(mapStateToProps,{storePlaces,updatePlaces,showMainDialog})(withStyles(adminMainDialogStyle)(AddNewPlace));