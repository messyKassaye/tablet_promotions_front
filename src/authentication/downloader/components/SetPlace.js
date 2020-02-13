import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Typography} from "@material-ui/core";
import {fetchPlaces} from "../../state/actions/placesController";
import {connect} from "react-redux";
import Divider from "@material-ui/core/Divider";
import PlaceIcon from '@material-ui/icons/Place';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import SetPlaceStyle from "./styles/setPlaceStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import {setPlace} from "../state/action/PivotAction";
import {commonFetchAdvertPlaces} from "../../commons/state/actions/commonAdvertPlacesAction";
import {green, grey} from "@material-ui/core/colors";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
class SetPlace extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData:{
                place_id:'',
                type:'place'
            },
            placeValue:'',
            isPlaceSelected:false,
            submitted: false,
            loading: false,
            finished: false,
            message:''
        }
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


    componentDidMount() {
        this.props.commonFetchAdvertPlaces()
    }

    findPlace = data=>{
        return data.filter(item=>{
            return item.id !== 1
        })
    }

    handleSubmit = event=>{
        event.preventDefault()
        this.setState({
            submitted:true,
            loading:true
        })

        const {formData} = this.state
        this.props.setPlace(formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                message:'Thank you. Your place is successfully set',
                submitted:false,
                loading:false
            })
            setTimeout(()=>{
                this.props.history.push('/auth')
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
            <Container maxWidth={"lg"}>
                <Card>
                    <CardHeader
                     title={'Set your location'}
                     avatar={<PlaceIcon/>}
                    />
                    <Divider/>
                    <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        {
                            this.props.loading
                            ?
                                (
                                    <Skeleton variant={"rect"} width={'100%'} height={150} style={{backgroundColor:grey[500]}}/>
                                )
                            :
                                (
                                    <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
                                        <Typography style={{color:green[500]}}>{this.state.message}</Typography>
                                        <FormControl className={classes.text_input}>
                                            <InputLabel
                                            >{'Select your residence city'}</InputLabel>
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
                                            text={'Set my place'}
                                            done={finished}
                                        >
                                            {
                                               'Set my place'
                                            }
                                        </LoadingButton>
                                    </ValidatorForm>
                                )
                        }

                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    places:state.authReducer.commonReducer.commonAdvertPlacesReducer.advertPlaces,
    loading:state.authReducer.commonReducer.commonAdvertPlacesReducer.loading,
    response:state.authReducer.downloaderReducers.pivotsReducer.response
})

export default connect(mapStateToProps,{commonFetchAdvertPlaces,setPlace})(withStyles(SetPlaceStyle)(SetPlace));