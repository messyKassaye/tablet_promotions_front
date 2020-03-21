import React from "react";
import {Dialog} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close'
import Toolbar from "@material-ui/core/Toolbar";
import {connect} from "react-redux";
import {showCarRegistrationModal} from "../state/actions/dialogActions";
import flags from "react-world-flags/src/flags";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import dialogStyle from "../style/registerCarsDialogStyle";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {carsStore} from "../state/actions/carsActions";
import {green, red} from "@material-ui/core/colors";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import SetPlace from "../../downloader/components/SetPlace";
import AddressCard from "../../commons/components/widgets/AddressCard";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
let  carsData = [];
class RegisterCarsDialog extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            fullScreen: false,
            selectValue:'Taxi',
            carValue:'',
            isCarSelected:false,
            isSelectOpened: false,
            showPlate:false,
            formData:{
                category_id:'',
                plate_number:''
            },
            submitted:false,
            loading:false,
            registerCarAddress:false,
            carId:'',
            element:''
        }

    }

    handleSelect = ()=>{
        this.setState({
            isSelectOpened:false
        })
    }

    handleSelectOpen = ()=>{
    this.setState({
        isSelectOpened:true
    })
    }
    handleSelectChange =(event)=>{
        this.setState({
            selectValue:event.target.value
        })
        carsData = this.props.categories.filter(items=>{
            return items.id === event.target.value
        })

        console.log(carsData)
    }


    handleCarSelectClose = ()=>{
        this.setState({
            isCarSelected:false,
        })
    }
    handleCarSelectOpen = ()=>{
        this.setState({
            isCarSelected:true,
        })
    }
    handleCarSelectChange = (event)=>{
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
        this.setState({
            carValue:event.target.value,
            showPlate:true
        })
    }

    handleClose = (event)=>{
        this.props.showCarRegistrationModal(false)
    }

    componentDidMount() {
        let deviceWidth = window.innerWidth;
        if(deviceWidth<=760){
            this.setState({
                fullScreen:true
            })
        }else {
            this.setState({
                fullScreen:false
            })
        }
        console.log(deviceWidth)
    }

    handlePlateChange = (e)=>{
        const {formData} = this.state
        formData[e.target.name] = e.target.value
        this.setState(formData)
    }

    handleSubmit = ()=>{
        this.setState({
            submitted:true,
            loading:true
        })
       const {formData} = this.state
        this.props.carsStore(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response){
            this.setState({
                loading:false,
                finished:true,
                submitted:false
            })
            if(nextProps.response.status){
                this.setState({
                    registerCarAddress:true,
                    element:nextProps.response.car
                })
            }
        }
    }

    render() {

        const {classes} = this.props
        const {formData} = this.state
        const { loading } = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.plate_number.length>0 && formData.category_id>0
        return (
            <Dialog
                fullScreen={this.state.fullScreen}
                disableBackdropClick={true}
                open={this.props.show}
                scroll='paper'
                keepMounted
                fullWidth={true}
                TransitionComponent={Transition}
                onClose={this.handleClose}>

                <DialogTitle className={classes.dialog_title} id="customized-dialog-title" onClose={this.handleClose}>
                        Register your cars.
                    <IconButton
                        color='inherit'
                        aria-label='close dialog'
                        className={classes.closeButton}
                        onClick={this.handleClose}
                        edge='end'>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers className={classes.content}>
                    {
                        this.state.registerCarAddress
                        ?
                            (
                                <AddressCard
                                    info={'Your car is registered to our system. Now we need your car work place/city'}
                                    element={this.state.element}
                                    type={'cars'}
                                    id={this.state.element.id}
                                    label={'Select on which city your car is working on now.'}
                                    btnText={'Set my car place'}
                                />
                            )
                        :
                            (
                                <div>
                                {
                                    this.props.response.status?
                                        (
                                            <Typography
                                                component='h6'
                                                variant='body2' style={{color:green[500]}}>
                                                {this.props.response.message}
                                            </Typography>
                                        )
                                        :
                                        (
                                            <Typography
                                                component='h6'
                                                variant='body2' style={{color:red[500]}}>
                                                {this.props.response.message}
                                            </Typography>
                                        )
                                }
                        <div>
                        <ValidatorForm
                        className={classes.form}
                        onSubmit={this.handleSubmit}
                        >
                        <FormControl  className={classes.formControl}>
                        <InputLabel htmlFor="demo-controlled-open-select">Select transport Service type</InputLabel>
                        <Select
                        name='parent'
                        value={this.state.selectValue}
                        open={this.state.isSelectOpened}
                        onClose={this.handleSelect}
                        onOpen={this.handleSelectOpen}
                        onChange={this.handleSelectChange}
                        >
                        {
                            this.props.categories.map(items=>(
                                <MenuItem key={items.name} value={items.id}>{items.name}</MenuItem>
                            ))
                        }
                        </Select>
                        </FormControl>

                        {

                            carsData.length>0?
                                (
                                    <FormControl className={classes.formControl} >
                                        <InputLabel htmlFor="demo-controlled-open-select">Select your car type</InputLabel>
                                        <Select
                                            name='category_id'
                                            value={this.state.carValue}
                                            open={this.state.isCarSelected}
                                            onClose={this.handleCarSelectClose}
                                            onOpen={this.handleCarSelectOpen}
                                            onChange={this.handleCarSelectChange}
                                        >
                                            {
                                                carsData.map(items=>items.child.map(child=>(
                                                    <MenuItem key={child.id} value={child.id}>{child.name}</MenuItem>
                                                )))
                                            }
                                        </Select>
                                    </FormControl>
                                )
                                :<span></span>
                        }

                        {
                            this.state.showPlate?
                                <TextValidator
                                    className={classes.formControl}
                                    label='Add plate number'
                                    onChange={this.handlePlateChange}
                                    name="plate_number"
                                    value={this.state.formData.plate_number}
                                    validators={['required']}
                                    errorMessages={['Please add your plate number']}
                                />
                                :(<span></span>)
                        }
                            <LoadingButton
                                color="primary"
                                variant="contained"
                                type="submit"
                                loading={setLoading}
                                style={{textTransform:'none',marginTop:20}}
                                done={finished}
                                text='Register'
                                disabled={!isEnabled ||this.state.submitted}
                                onClick={this.handleSubmit}>
                                Register
                            </LoadingButton>
                        </ValidatorForm>
                        </div>
                        </div>

                            )
                    }
                </DialogContent>
            </Dialog>
        );
    }


}

const mapStateToProps = state=>({
    show:state.authReducer.driversReducers.dialogsData.show,
    categories:state.authReducer.driversReducers.categoriesData.categories,
    response:state.authReducer.driversReducers.carsData.responseStatus,
    loading: state.authReducer.driversReducers.carsData.loading,

    places:state.authReducer.commonReducer.commonAdvertPlacesReducer.advertPlaces,
    PlacesLoading:state.authReducer.commonReducer.commonAdvertPlacesReducer.loading,
})

export default withStyles(dialogStyle)(connect(mapStateToProps,{showCarRegistrationModal,carsStore})(RegisterCarsDialog))