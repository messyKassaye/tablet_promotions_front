import React, {Component} from 'react';
import {commonFetchAdvertPlaces} from "../../state/actions/commonAdvertPlacesAction";
import {Grid,Container,Card,CardHeader,CardContent,Typography} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {connect} from "react-redux";
import FourByFourSkeleton from "../../loading/customSkeleton";
import {green} from "@material-ui/core/colors";
import {showCarAdvert} from "../../state/actions/CommonCarAdvertAction";

class AdvertViewsInPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfViews:0
        }
    }

    componentDidMount() {
        this.props.commonFetchAdvertPlaces()
        this.props.showCarAdvert(this.props.advert.id)
    }

    findPlace = place=>{
        if (place.length===1){
            return this.props.places.filter(place=>place.id!==1)
        }else {
            return place.filter(place=>place.id!==1);
        }

    }

    findView = (view,city)=>{
        
        let places = []
        let response = {
            places:[],
            numberOfViews: new Array()
        }
        view.data.map(advertView=>{
            if(advertView.car.working_place[0].city===city){
                places.push(advertView.car.working_place[0].city)
                response.numberOfViews.push(advertView.number_of_viewers);
            }
        })
        response.places = places
        return response;
    }

    findTotalView = (data)=>{
        let total = 0;
        data.map(view=>{
            return total+=view;
        })

        return total;
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
                                    this.findPlace(this.props.advert.advert_places)
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
                                                    <CardContent style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >
                                                        <div style={{display:'flex',flexDirection:'column',textAlign:'center'}}>
                                                            <Typography variant={'h2'} style={{color:green[500]}}>
                                                                {this.findView(this.props.carAdvert,place.city).places.length}
                                                            </Typography>
                                                            <Typography style={{color:green[500]}}>
                                                                Advert plays
                                                            </Typography>
                                                        </div>

                                                        <div style={{display:'flex',flexDirection:'column'}}>
                                                            <Typography variant={'h2'} style={{color:green[500],textAlign:'center'}}>
                                                                {this.findTotalView(this.findView(this.props.carAdvert,place.city).numberOfViews)}
                                                            </Typography>
                                                            <Typography style={{color:green[500]}}>
                                                                Peoples watch it
                                                            </Typography>
                                                        </div>
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