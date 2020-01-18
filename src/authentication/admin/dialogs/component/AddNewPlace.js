import React, {Component} from 'react';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import adminMainDialogStyle from "../styles/mainDialogStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
class AddNewPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                name:''
            }
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0
        return (
            <ValidatorForm className={classes.form}>
                <TextValidator
                 name={'name'}
                 label={'Place name'}
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

export default withStyles(adminMainDialogStyle)(AddNewPlace);