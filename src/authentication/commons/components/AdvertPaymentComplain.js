import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../../admin/dialogs/styles/mainDialogStyle";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {storeAdvertComplain} from "../state/actions/commonAdvertComplainAction";
import {connect} from "react-redux";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {green} from "@material-ui/core/colors";
import {showMainDialog} from "../../admin/state/action/dialogAction";

class AdvertPaymentComplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                advert_id:0,
                message:''
            },
            submitted: false,
            loading: false,
            finished: false,
        }
    }

    componentDidMount() {
        const {formData} = this.state
        formData['advert_id'] = this.props.advert.id
        this.setState(formData)
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        this.props.storeAdvertComplain(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                submitted:false,
                loading:false
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
                },2000)
            })
        }
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.message.length > 0
        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <Typography style={{color:green[500]}}>{this.props.response.message}</Typography>
                <TextField
                 name='message'
                 className={classes.textInput}
                 placeholder={'Add your your complain message'}
                 onChange={this.handleChange}
                 value={this.state.formData.message}
                 multiline={true}
                 rows={10}
                 cols={5}
                />

                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'send'}
                    done={finished}
                >
                    {
                        'Send'
                    }
                </LoadingButton>

            </form>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.commonReducer.commonAdvertsComplainReducer.response
})

export default connect(mapStateToProps,{storeAdvertComplain,showMainDialog})
(withStyles(adminMainDialogStyle)(AdvertPaymentComplain));
