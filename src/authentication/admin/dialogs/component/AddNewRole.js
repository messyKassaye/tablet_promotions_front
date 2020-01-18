import React, {Component} from 'react';
import {Switch, TextField, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import {translate} from "react-i18next";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {storeRole,updateRole} from "../../state/action/roleAction";
import {showMainDialog} from "../../state/action/dialogAction";
import {connect} from "react-redux";
import {green, red} from "@material-ui/core/colors";
class AddNewRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                'name':'',
                'is_public':true
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name]= event.target.value;
        this.setState(formData)
    }

    handleChecked = event=>{
        const {formData} = this.state
        formData[event.target.name] = !formData.is_public
        this.setState(formData)
    }

    handleSubmit = (event)=>{
        event.preventDefault()

        this.setState({
            submitted: true,
            loading: true
        })


        if(this.props.form.type==='Edit'){
           const {formData} = this.state
            this.props.updateRole(this.props.form.data.id,formData)
        }else {
            const {formData} = this.state
            this.props.storeRole(formData)
        }

    }

    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['name'] = this.props.form.data.name
            formData['is_public'] =this.props.form.data.is_public
            this.setState(formData)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
            })
            this.props.role.push(nextProps.response.data)
            setTimeout(()=>{
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
        const isEnabled = formData.name.length > 0
        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:`${this.props.response.status?red[5000]:green[500]}`}}>{this.props.response.message}</Typography>
                <TextField
                    className={classes.textInput}
                    onChange={this.handleChange}
                    name='name'
                    placeholder={'Role name'}
                    value={this.state.formData.name}
                />
                <div style={{display:'flex',justifyContent:'start',alignItems:'start',marginBottom:20}}>
                    <Typography style={{marginRight:20}}>Accessibility</Typography>
                    <Switch
                        checked={this.state.formData.is_public}
                     name='is_public'
                     onChange={this.handleChecked}
                     value={this.state.formData.is_public}
                     color='primary'
                    >

                    </Switch>
                </div>

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
    response: state.authReducer.adminReducers.roleReducer.response,
    role:state.authReducer.adminReducers.roleReducer.role
})

export default connect(mapStateToProps,{storeRole,showMainDialog,updateRole})
(translate('common')(withStyles(adminMainDialogStyle)(AddNewRole)));
