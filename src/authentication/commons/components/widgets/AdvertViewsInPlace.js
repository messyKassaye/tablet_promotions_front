import React, {Component} from 'react';
import {commonFetchAdvertPlaces} from "../../state/actions/commonAdvertPlacesAction";
import {Grid,Container,Card,CardHeader,CardContent,Typography} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {connect} from "react-redux";
import FourByFourSkeleton from "../../loading/customSkeleton";
import {green} from "@material-ui/core/colors";
import {showCarAdvert} from "../../state/actions/CommonCarAdvertAction";

class AdvertViewsInPlace extends Component {

    componentDidMount() {
        this.props.commonFetchAdvertPlaces()
        this.props.showCarAdvert(this.props.advert.id)
    }

    findPlace = place=>{
        return place.filter(place=>place.id!==1);
    }

    findView = (view,city)=>{
        let places = []
        view.data.map(advertView=>{
            if(advertView.car.working_place[0].city===city){
                places.push(advertView.car.working_place[0])
            }
        })
        return places;
    }

    render() {
        return (
            <Container maxWidth={"lg"}>
                {
                    this.props.loading&&this.props.carAdvertLoading
                        ?
                        (<FourByFourSkeleton/>)
                        :
                        (
                            <Grid container spacing={2}>
                                {
                                    this.findPlace(this.props.places)
                                        .map(place=>(
                                            <Grid item md={3} xs={12} sm={12}>
                                                <Card style={{
                                                    display:'flex',
                                                    flexDirection:'column',
                                                    alignItems:'center'}}>
                                                    <CardHeader
                                                        avatar={<LocationOnIcon/>}
                                                        title={place.city}
                                                    />
                                                    <CardContent >
                                                        <Typography variant={'h2'} style={{color:green[500]}}>
                                                            {this.findView(this.props.carAdvert,place.city).length}
                                                        </Typography>
                                                        <Typography variant={"h4"} style={{color:green[500]}}>
                                                             views
                                                        </Typography>
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
    loading:state.authReducer.commonReducer.commonAdvertPlacesReducer.loading,
    carAdvert:state.authReducer.commonReducer.commonCarAdvertsReducer.carAdverts,
    carAdvertLoading:state.authReducer.commonReducer.commonCarAdvertsReducer.loading
})
export default connect(mapStateToProps,{commonFetchAdvertPlaces,showCarAdvert})(AdvertViewsInPlace);