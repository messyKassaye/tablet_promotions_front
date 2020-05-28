import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid, CardMedia,
    Avatar, Tab, Tabs, Typography} from "@material-ui/core";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import VideocamIcon from '@material-ui/icons/Videocam'
import {fetchCars} from "../../../../home/state/action/carsAction";
import {fetchAdvertMedia} from "../../../../home/state/action/advertMediaAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {deepOrange, grey} from "@material-ui/core/colors";
import FourByFourSkeleton from "./customSkeleton";

class AdvertiserCarAndMedia extends Component {

    componentDidMount() {
        this.props.fetchCars()
        this.props.fetchAdvertMedia()
    }

    render() {
        return (
            <Grid container spacing={2}>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{minHeight: 400, overflowY: 'auto'}}>
                        <CardHeader
                            style={{padding: 0}}
                            title={'Advertisement car type'}
                            avatar={<DirectionsCarIcon/>}
                        />
                        <CardContent style={{display: 'flex', flexDirection: 'column'}}>
                            {
                                this.props.carsLoading
                                    ?
                                    (
                                        <div style={{display: 'flex', flexDirection: 'column', padding: 20}}>
                                            <Skeleton
                                                variant={"text"}
                                                width={100}
                                                height={20}
                                                style={{backgroundColor: grey[500]}}
                                            />
                                            <div style={{display: 'flex', flexDirection: 'row', padding: 10}}>
                                                <Skeleton variant={"circle"} width={40} height={40}
                                                          style={{backgroundColor: grey[500],}}/>
                                                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
                                                    <Skeleton variant={"text"} width={150} height={20}
                                                              style={{backgroundColor: grey[500]}}/>
                                                    <Skeleton variant={"text"} width={150} height={20}
                                                              style={{backgroundColor: grey[500]}}/>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            {
                                                this.props.categories.map(category => (
                                                    <Card elevation={0}>
                                                        <CardHeader
                                                            subheader={category.name}
                                                            style={{padding: 0}}
                                                            key={category.id}
                                                        />
                                                        <CardContent style={{padding: 10}}>
                                                            {
                                                                category.child.map(child => (
                                                                    <div key={child.id} style={{
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        marginBottom: 10
                                                                    }}>
                                                                        <Avatar src={child.image} width={40}
                                                                                height={40}/>
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            marginLeft: 10
                                                                        }}>
                                                                            <Typography
                                                                                style={{color: grey[400]}}>{child.name}</Typography>
                                                                            <Typography>{child.description}</Typography>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            }
                                        </div>
                                    )
                            }
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{minHeight: 400, overflowY: 'auto'}}>
                        <CardHeader
                            title={'Advertisement media types'}
                            avatar={<VideocamIcon/>}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                {
                                    this.props.loading
                                        ?
                                        (
                                            <Grid container spacing={2}>

                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Skeleton
                                                        variant={"rect"}
                                                        height={150}
                                                        style={{backgroundColor: grey[500]}}/>
                                                </Grid>

                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Skeleton
                                                        variant={"rect"}
                                                        height={150}
                                                        style={{backgroundColor: grey[500]}}/>
                                                </Grid>
                                            </Grid>
                                        )
                                        :
                                        (
                                            this.props.medias.map(media => (
                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Card>
                                                        <CardContent style={{display: 'flex',flexDirection:'column',alignItems:'center'}}>
                                                            <Avatar variant="square">
                                                                N
                                                            </Avatar>

                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            ))
                                        )
                                }

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.homeReducer.categoriesReducer.categories,
    carsLoading: state.homeReducer.categoriesReducer.loading,
    medias: state.homeReducer.mediaReducer.medias,
    loading: state.homeReducer.mediaReducer.loading
})

export default connect(mapStateToProps, {fetchCars, fetchAdvertMedia})
(AdvertiserCarAndMedia);