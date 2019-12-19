import React, {Component} from 'react';
import {connect} from "react-redux";
import {showMainDialog} from "../../state/action/dialogAction";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import {TextField} from "@material-ui/core";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {storeCarCategory,updateCarCategory} from "../../state/action/carCategoryAction";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";

class AddNewCarCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                'parent_id':0,
                'name':'',
                'number_of_people':0,
                'description':'',
                'image':''
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name]=event.target.value
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted: true,
            loading: true
        })
        const {formData} = this.state
        if(this.props.form.type==='Edit'){
            console.log(formData)
           this.props.updateCarCategory(formData,this.props.form.data.id)
        }else {
            this.props.storeCarCategory(formData)
        }


    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
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

    componentDidMount() {
        if(this.props.form.type==='Edit'){
            const {formData} = this.state
            formData['name'] = this.props.form.data.name
            this.setState(formData)
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
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextField
                 placeholder='Category name'
                 name='name'
                 value={this.state.formData.name}
                 onChange={this.handleChange}
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
    response:state.authReducer.adminReducers.categoryReducer.response
})

export default connect(mapStateToProps,{showMainDialog,storeCarCategory,updateCarCategory})
(withStyles(adminMainDialogStyle)(translate('common')(AddNewCarCategory)));
