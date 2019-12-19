import React, {Component} from 'react';
import {Button, TextField} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import adminMainDialogStyle from "../styles/mainDialogStyle";
import Typography from "@material-ui/core/Typography";
import {storeBase64} from "../../state/action/base64Action";
import {connect} from "react-redux";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {storeCarCategory} from "../../state/action/carCategoryAction";
import {showMainDialog} from "../../state/action/dialogAction";

class AddChildCategory extends Component {
    constructor(props) {
        super(props);
        this.inputFile = React.createRef();
        this.state= {
            formData:{
                parent_id:0,
                name:'',
                number_of_people: 0,
                image:'',
                description:''
            },
            submitted: false,
            loading: false,
            finished: false,
            selectedFile: null,
        }
    }

    handleChange = event=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    componentDidMount() {
        const {formData} = this.state
        formData['parent_id'] = this.props.category.id;
        this.setState(formData)
    }

    handleFile = (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file);
        this.props.storeBase64(formData)
    }

    handleFileInput = ()=>{
        this.inputFile.current.click();
    }

    cancelImage = ()=>{
        const {formData} = this.state
        formData['image'] = ''
        this.setState({
            selectedFile:null,
            formData
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.base64Response) {
            const {formData} = this.state
            formData['image'] = nextProps.base64Response.data
            this.setState({
                selectedFile: nextProps.base64Response.data,
                formData
            })
        }

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

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted: true,
            loading: true
        })

        const {formData} = this.state
        this.props.storeCarCategory(formData)
    }

    render() {
        const {category,classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.name.length > 0 && formData.number_of_people.length > 0&&
            formData.description.length>0&&formData.image.length>0

        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
               <TextField
                name='name'
                placeholder='Category name'
                className={classes.textInput}
                onChange={this.handleChange}
                value={this.state.formData.name}
               />

                <TextField
                    name='number_of_people'
                    placeholder='Maximum number of people'
                    className={classes.textInput}
                    onChange={this.handleChange}
                    value={this.state.formData.number_of_people}
                />

               <TextField
                name='description'
                className={classes.textInput}
                placeholder='add category description'
                rows={10}
                cols={15}
                multiline={true}
                onChange={this.handleChange}
                value={this.state.formData.description}
               />
                {
                    this.state.selectedFile == null
                        ?
                        (
                            <div className={classes.logo_picker}>
                                <Typography>Upload category image</Typography>
                                <input
                                    onChange={this.handleFile}
                                    ref={this.inputFile}
                                    style={{display: 'none'}}
                                    accept="image/*"
                                    id="outlined-button-file"
                                    type="file"
                                />
                                <label>
                                    <Button variant="outlined" component="span" onClick={this.handleFileInput}>
                                        Upload
                                    </Button>
                                </label>
                            </div>
                        )
                        :
                        (
                            <div className={classes.images}>
                                <img src={this.state.selectedFile} className={classes.logo}/>
                                <Button variant='text' color='primary' onClick={this.cancelImage}>cancel</Button>
                            </div>
                        )
                }
                <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isEnabled || this.state.submitted}
                    loading={setLoading}
                    text={'Add cateogry'}
                    done={finished}
                >
                    {
                        'Add category'
                    }
                </LoadingButton>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    base64Response: state.authReducer.adminReducers.base64.base64Response,
    response:state.authReducer.adminReducers.categoryReducer.response
})

export default connect(mapStateToProps,{storeBase64,storeCarCategory,showMainDialog})
(withStyles(adminMainDialogStyle)(AddChildCategory));
