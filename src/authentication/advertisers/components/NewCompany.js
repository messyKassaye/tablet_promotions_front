import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader"
import withStyles from "@material-ui/core/styles/withStyles";
import newCompanyStyle from "../styles/newCompanyStyle";
import CardContent from "@material-ui/core/CardContent";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {connect} from "react-redux";
import {storeCompany} from "../state/action/companiesAction";
import {translate} from "react-i18next";
import {addNewCompanyLocally} from "../../state/actions/usersActions";

class NewCompany extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                'name':'',
                'phone':'',
                'website':''
            },
            submitted: false,
            loading: false,
            finished: false,
        }

    }

    handleChange = (event)=>{
        const {formData} =this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }
    handleSubmit = ()=>{
        const {formData} = this.state;
        this.setState({
            submitted: true,
            loading: true
        })
        this.props.storeCompany(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.company){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.loading){
            this.props.addNewCompanyLocally(this.props.company)
        }

    }

    render() {
        const {classes} =this.props
        const {formData} = this.state
        const {loading} = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.phone.length>0&&formData.website.length>0
        const {t} = this.props
        return (
            <div>
                <div>
                    <Card>
                        <CardHeader
                            className={classes.header}
                            title={t('advertiser.new_company.form.title')}


                        />
                        <CardContent style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div className={classes.container}>
                            <ValidatorForm
                                className={classes.form}
                                onSubmit={this.handleSubmit}
                            >
                                <TextValidator
                                    className={classes.formControl}
                                    label={t('advertiser.new_company.form.company_name')}
                                    onChange={this.handleChange}
                                    name="name"
                                    value={this.state.formData.name}
                                    validators={['required']}
                                    errorMessages={['Please enter your company name']}
                                />

                                <TextValidator
                                    className={classes.formControl}
                                    label={t('advertiser.new_company.form.phone')}
                                    onChange={this.handleChange}
                                    name="phone"
                                    value={this.state.formData.phone}
                                    validators={['required']}
                                    errorMessages={['Please enter your company name']}
                                />
                                <TextValidator
                                    className={classes.formControl}
                                    label={t('advertiser.new_company.form.website')}
                                    onChange={this.handleChange}
                                    name="website"
                                    value={this.state.formData.website}
                                />
                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'end',
                                    marginTop:10
                                }}>
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
                                </div>
                            </ValidatorForm>
                            </div>
                        </CardContent>
                    </Card>
            </div>
            </div>
        );
    }


}

const mapStateToProps = state=>({
    loading: state.authReducer.advertisersReducers.companyData.loading,
    company: state.authReducer.advertisersReducers.companyData.company
})

export default translate('common')
(connect(mapStateToProps,{storeCompany,addNewCompanyLocally})(withStyles(newCompanyStyle)(NewCompany)))
