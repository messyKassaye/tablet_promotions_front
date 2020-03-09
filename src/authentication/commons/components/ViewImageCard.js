import React, {Component} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import advertViewInImageStyle from "../style/advertViewInImageStyle";
import {connect} from "react-redux";
import {updateCarAdvert} from "../../admin/state/action/AdminCarAdvertAction";
import LoadingButton from "../../../home/components/widgets/LoadingButton";

class ViewImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            submitted:false,
            finished:false,
            formData:{
                status:''
            }
        }
    }


    notRealAdvert = ()=>{
        const {formData} = this.state
        formData['status'] = 'not_real_advert'
        this.setState({
            submitted:true,
            loading:true,
            formData
        })
         this.updateCarAdvert()
    }

    changeToReal = ()=>{
        const {formData} = this.state
        formData['status'] = 'On progress'
        this.setState({
            submitted:true,
            loading:true,
            formData
        })
        this.updateCarAdvert()
    }

    updateCarAdvert = ()=>{
        const {formData} = this.state
        this.props.updateCarAdvert(this.props.carAds.id,formData)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.response.status){
            this.setState({
                submitted:false,
                loading:false
            })
        }
    }

    render() {
        const {carAds,classes} = this.props
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={carAds.picture}
                        title={`Advert on ${carAds.advert_time}`}
                    />
                    <CardContent>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography>Advert time: </Typography>
                            <Typography color={"primary"}>{carAds.advert_time}</Typography>
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography>Number of viewers: </Typography>
                            <Typography color={"primary"}>{carAds.number_of_viewers}</Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
                {
                    this.props.action
                    ?
                        (
                            <CardActions
                                style={{display:'flex',
                                    flexDirection:'row',
                                    justifyContent:'flex-end'}}
                            >

                                {
                                    this.props.carAds.status==='not_real_advert'
                                    ?
                                        (
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <Typography color={"secondary"}>
                                                    This advert is approved as not real advert
                                                </Typography>
                                                <LoadingButton
                                                    color={"primary"}
                                                    variant={"outlined"}
                                                    style={{textTransform:'none',marginTop:10}}
                                                    disabled={!isEnabled || this.state.submitted}
                                                    loading={setLoading}
                                                    text={"It's real advert"}
                                                    done={finished}
                                                    size={'small'}
                                                    onClick={()=>this.changeToReal(carAds.id)}
                                                >
                                                    It's real advert
                                                </LoadingButton>
                                            </div>
                                        )
                                    :
                                        (
                                            <LoadingButton
                                                color={"primary"}
                                                variant={"outlined"}
                                                style={{textTransform:'none'}}
                                                disabled={!isEnabled || this.state.submitted}
                                                loading={setLoading}
                                                text={'Not real advert'}
                                                done={finished}
                                                size={'small'}
                                                onClick={()=>this.notRealAdvert(carAds.id)}
                                            >
                                                Not real advert
                                            </LoadingButton>
                                        )
                                }
                            </CardActions>
                        )
                    :
                        (null)
                }
            </Card>
        );
    }
}

const mapStateToProps = state=>({
    response:state.authReducer.adminReducers.carAdvertsReducer.response
})

export default connect(mapStateToProps,{updateCarAdvert})
(withStyles(advertViewInImageStyle)(ViewImageCard));