import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader"
import withStyles from "@material-ui/core/styles/withStyles";
import newCompanyStyle from "../styles/newCompanyStyle";
import CardContent from "@material-ui/core/CardContent";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {connect} from "react-redux";
import {storeCompany,updateCompany} from "../state/action/companiesAction";
import {translate} from "react-i18next";
import {addNewCompanyLocally} from "../../state/actions/usersActions";
import adminMainDialogStyle from "../../admin/dialogs/styles/mainDialogStyle";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import {showMainDialog} from "../../admin/state/action/dialogAction";

class NewCompany extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                'name': '',
                'phone': '',
                'website': ''
            },
            submitted: false,
            loading: false,
            finished: false,
        }

    }

    handleChange = (event) => {
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }
    handleSubmit = () => {
        const {formData} = this.state;
        this.setState({
            submitted: true,
            loading: true
        })
        if(this.props.form.type==='Edit'){
            this.props.updateCompany(formData,this.props.form.data.id)
        }else {
            this.props.storeCompany(formData)
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.response.status) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
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
            },2000)
        }
    }

    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['name'] = this.props.form.data.name
            formData['phone']=this.props.form.data.phone
            formData['website'] = this.props.form.data.website
            this.setState(formData)
        }
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.phone.length > 0 && formData.website.length > 0
        const {t} = this.props
        return (
            <div>

                <div className={classes.container}>
                    <ValidatorForm
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                    >
                        <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                        <TextValidator
                            className={classes.textInput}
                            label={t('advertiser.new_company.form.company_name')}
                            onChange={this.handleChange}
                            name="name"
                            value={this.state.formData.name}
                            validators={['required']}
                            errorMessages={['Please enter your company name']}
                        />

                        <TextValidator
                            className={classes.textInput}
                            label={t('advertiser.new_company.form.phone')}
                            onChange={this.handleChange}
                            name="phone"
                            value={this.state.formData.phone}
                            validators={['required']}
                            errorMessages={['Please enter your company name']}
                        />
                        <TextValidator
                            className={classes.textInput}
                            label={t('advertiser.new_company.form.website')}
                            onChange={this.handleChange}
                            name="website"
                            value={this.state.formData.website}
                        />
                        <LoadingButton
                            style={{textTransform: 'capitalize'}}
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={!isEnabled || this.state.submitted}
                            loading={setLoading}
                            done={finished}
                            text={t('advertiser.new_company.form.register_btn')}>
                        </LoadingButton>
                    </ValidatorForm>
                </div>
            </div>
        );
    }


}

const mapStateToProps = state => ({
    loading: state.authReducer.advertisersReducers.companyData.loading,
    response: state.authReducer.advertisersReducers.companyData.response
})

export default translate('common')
(connect(mapStateToProps, {storeCompany, updateCompany,showMainDialog})(withStyles(adminMainDialogStyle)(NewCompany)))
