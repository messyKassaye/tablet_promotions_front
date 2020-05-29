import React, {Component} from 'react';
import {commonFetchAdvertPlaces} from "../../state/actions/commonAdvertPlacesAction";
import {Grid,Container,Card,CardHeader,CardContent,Typography} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {connect} from "react-redux";
import FourByFourSkeleton from "../../loading/customSkeleton";
import {green} from "@material-ui/core/colors";
class AdvertViewsInPlace extends Component {

    componentDidMount() {
        this.props.commonFetchAdvertPlaces()
    }

    findPlace = place=>{
        return place.filter(place=>place.id!==1);
    }

    findView = (view,city)=>{
        console.log('Hello')
        let places = []
        view.map(advertView=>{
            console.log("Advert"+advertView)
            advertView.car.map(car=>{
                console.log("Car: "+car)
                if(car.working_place[0].city===city){
                    places.push(car.working_place[0])
                }
            })
        })
        return places;
    }

    render() {
        return (
            <Container maxWidth={"lg"}>
                {
                    this.props.loading
                        ?
                        (<FourByFourSkeleton/>)
                        :
                        (
                            <Grid container spacing={2}>
                                {
                                    this.findPlace(this.props.places).map(place=>(
                                        <Grid item md={4} xs={12} sm={12}>
                                            <Card>
                                                <CardHeader
                                                    title={place.city}
                                                    avatar={<LocationOnIcon/>}/>
                                                <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center',color:green[500]}}>
                                                    <Typography variant={"h2"}>
                                                        {this.findView(this.props.views,place.city).length}
                                                    </Typography>
                                                    <Typography>Views</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                }

            </Container>
        );
    }
}

const mapStateToProps = state=>({
    places:state.authReducer.commonReducer.commonAdvertPlacesReducer.advertPlaces,
    loading:state.authReducer.commonReducer.commonAdvertPlacesReducer.loading
})
export default connect(mapStateToProps,{commonFetchAdvertPlaces})(AdvertViewsInPlace);