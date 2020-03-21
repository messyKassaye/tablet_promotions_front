import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card, CardContent, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import {ValidatorForm} from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import withStyles from "@material-ui/core/styles/withStyles";
import SetPlaceStyle from "../../../downloader/components/styles/setPlaceStyle";
import {commonFetchAdvertPlaces} from "../../state/actions/commonAdvertPlacesAction";
import {updateCars} from "../../../drivers/state/actions/carsActions";
import {showCarRegistrationModal} from "../../../drivers/state/actions/dialogActions";

class AddressCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData:{
                place_id:'',
                plate_number: ''
            },
            placeValue:'',
            isPlaceSelected:false,
            submitted: false,
            loading: false,
            finished: false,
            message:''
        }
    }

    componentDidMount() {
        this.props.commonFetchAdvertPlaces()
    }

    findPlace = data=>{
        return data.filter(item=>{
            return item.id !== 1
        })
    }

    handlePlaceSelect = () => {
        this.setState({
            isPlaceSelected: false
        })
    }

    handlePlaceSelectOpen = () => {
        this.setState({
            isPlaceSelected: true
        })
    }

    handlePlaceSelectChange = (event) => {
        this.setState({
            placeValue: event.target.value,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)

    }

    handleCarClose = (event)=>{
        this.props.showCarRegistrationModal(false)
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })
        const {formData} = this.state
        formData['plate_number'] = this.props.element.plate_number
        this.props.updateCars(formData,this.props.id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.updateCarResponse.status){
            this.setState({
                submitted:false,
                loading:false
            })
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }
    }

    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = formData.place_id > 0
        return (
            <Card elevation={0}>

                <CardContent>
                    {
                        this.props.loading
                            ?
                            (
                                <Skeleton variant={"rect"} width={'100%'} height={150} style={{backgroundColor:grey[500]}}/>
                            )
                            :
                            (
                                <ValidatorForm onSubmit={this.handleSubmit}>
                                    <Typography color={"primary"}>{this.props.info}</Typography>
                                    <Typography style={{color:green[500]}}>{this.props.updateCarResponse.message}</Typography>
                                    <FormControl className={classes.text_input}>
                                        <InputLabel
                                        >{this.props.label}</InputLabel>
                                        <Select
                                            name='place_id'
                                            value={this.state.placeValue}
                                            open={this.state.isPlaceSelected}
                                            onClose={this.handlePlaceSelect}
                                            onOpen={this.handlePlaceSelectOpen}
                                            onChange={this.handlePlaceSelectChange}
                                        >
                                            {
                                                this.findPlace(this.props.places).map(items => (
                                                    <MenuItem key={items.city} value={items.id}
                                                              name={items.city}>{items.city}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                    <LoadingButton
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={!isEnabled || this.state.submitted}
                                        className={classes.text_input}
                                        loading={setLoading}
                                        text={this.props.btnText}
                                        done={finished}
                                    >
                                        {
                                            this.props.btnText
                                        }
                                    </LoadingButton>
                                </ValidatorForm>
                            )
                    }

                </CardContent>

            </Card>
        );
    }
}

const mapStateToProps = state=>({
    places:state.authReducer.commonReducer.commonAdvertPlacesReducer.advertPlaces,
    updateCarResponse:state.authReducer.driversReducers.carsData.updateResponse,
    loading:state.authReducer.commonReducer.commonAdvertPlacesReducer.loading,
})

export default withStyles(SetPlaceStyle)
(connect(mapStateToProps,{commonFetchAdvertPlaces,updateCars,showCarRegistrationModal})(AddressCard));