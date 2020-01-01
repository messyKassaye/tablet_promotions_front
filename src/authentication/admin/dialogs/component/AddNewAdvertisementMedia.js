import React, {Component} from 'react';
import adminMainDialogStyle from "../styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {fetchCurrency} from "../../state/action/currencyAction";
import {TextField} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Skeleton from "@material-ui/lab/Skeleton";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {storeAdvertMedia} from "../../state/action/advertisementMediaTypeActions";
import {showMainDialog} from "../../state/action/dialogAction";
import {updateAdvertMedia} from "../../state/action/advertisementMediaTypeActions";
import {translate} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import {green, grey} from "@material-ui/core/colors";
import Label from "recharts/es6/component/Label";
class AddNewAdvertisementMedia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                'name':'',
                'currency_id':0,
                'per_view_payment':0.0,
                'description':''
            },
            submitted: false,
            loading: false,
            finished: false,
            isSelectOpened: false,
            selectValue: '',
        }
    }
    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleSelect = () => {
        this.setState({
            isSelectOpened: false
        })
    }

    handleSelectOpen = () => {
        this.setState({
            isSelectOpened: true
        })
    }

    handleSelectChange = (event) => {
        this.setState({
            selectValue: event.target.value
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            loading:true,
            submitted:true
        })

        const {formData} =this.state
        if(this.props.form.type==='Edit'){
           this.props.updateAdvertMedia(formData,this.props.form.data.id);
        }else {
            this.props.storeAdvertMedia(formData)
        }

    }
    componentDidMount() {
        this.props.fetchCurrency()
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            const {form} = this.props
            formData['name'] = form.data.name
            formData['per_view_payment']=form.data.per_view_payment
            formData['description'] = form.data.description
            formData['currency_id'] = form.data.currency.id
            this.setState({
                selectValue:form.data.currency.id,
                formData
            })
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
                window.location.reload()
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)
        }
    }

    render() {
        const {classes,t} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.per_view_payment.length > 0&&
            formData.currency_id>0 &&formData.description.length>0

        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextField
                    name='name'
                    className={classes.textInput}
                    placeholder='Enter media name E.g video, image, audio'
                    onChange={this.handleChange}
                    value={this.state.formData.name}
                />

                <FormControl>
                    <Label id={'per_view_payment'}>Per view payment</Label>
                    <TextField
                        id={'per_view_payment'}
                        name='per_view_payment'
                        className={classes.textInput}
                        placeholder='Per view payment'
                        onChange={this.handleChange}
                        value={this.state.formData.per_view_payment}
                    />
                </FormControl>
                {
                    this.props.loading
                    ?
                        (<Skeleton style={{backgroundColor:grey[500]}} width='100%' height={50} variant='rect'/>)
                    :
                        (
                            <FormControl className={classes.textInput}>
                                <InputLabel
                                    htmlFor="demo-controlled-open-select">{'Select payment currency'}</InputLabel>
                                <Select
                                    name='currency_id'
                                    value={this.state.selectValue}
                                    open={this.state.isSelectOpened}
                                    onClose={this.handleSelect}
                                    onOpen={this.handleSelectOpen}
                                    onChange={this.handleSelectChange}
                                >
                                    {
                                        this.props.currency.map(items => (
                                            <MenuItem key={items.name}
                                                      value={items.id}>{items.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        )
                }

                <TextField
                    name='description'
                    placeholder='Description'
                    onChange={this.handleChange}
                    value={this.state.formData.description}
                    rows={10}
                    cols={15}
                    multiline={true}
                    className={classes.textInput}
                />

                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={t('dialog.addNewBank.addNewBakButton')}
                    done={finished}
                >
                    {
                        t('dialog.addNewBank.addNewBakButton')
                    }
                </LoadingButton>

            </form>
        );
    }
}

const mapStateToProps = state=>({
    currency:state.authReducer.adminReducers.currenciesReducer.currency,
    loading:state.authReducer.adminReducers.currenciesReducer.loading,
    response:state.authReducer.adminReducers.advertMediaReducer.response
})

export default connect(mapStateToProps,{fetchCurrency,storeAdvertMedia,showMainDialog,updateAdvertMedia})
(withStyles(adminMainDialogStyle)(translate('common')(AddNewAdvertisementMedia)));
