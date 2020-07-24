import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid, Divider,
    Avatar, Tab, Tabs, Typography} from "@material-ui/core";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import VideocamIcon from '@material-ui/icons/Videocam'
import {fetchCars} from "../../../../home/state/action/carsAction";
import {fetchAdvertMedia} from "../../../../home/state/action/advertMediaAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import MusicNotIcon from '@material-ui/icons/MusicNote'
import {translate} from "react-i18next";
class AdvertiserCarAndMedia extends Component {

    componentDidMount() {
        this.props.fetchCars()
        this.props.fetchAdvertMedia()
    }

    render() {
        const {t} = this.props
        return (
            <Grid container spacing={2}>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{minHeight: 400, overflowY: 'auto',padding:10}}>
                        <CardHeader
                            style={{padding: 0}}
                            title={t('advertiser.dashboard.advertMediaAndCar.carsTitle')}
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
                                                            subheader={t(`home.${category.name}`)}
                                                            style={{padding: 0}}
                                                            key={category.id}
                                                        />
                                                        <CardContent style={{padding: 10}}>
                                                            {
                                                                category.child.map(child => (
                                                                    <Card elevation={0}>
                                                                        <CardHeader
                                                                        avatar={
                                                                            <Avatar
                                                                                src={child.image}
                                                                                width={40}
                                                                                height={40}/>
                                                                        }
                                                                        title={child.name}
                                                                        subheader={`Expected viewers: ${child.number_of_people}`}/>
                                                                        <CardContent style={{padding:0}}>
                                                                            <Typography style={{textAlign:"justify"}}>
                                                                                {child.description}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Card>
                                                                ))
                                                            }
                                                        </CardContent>
                                                        <Divider/>
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
                            title={t('advertiser.dashboard.advertMediaAndCar.mediaTitle')}
                            avatar={<VideocamIcon/>}
                        />
                        <CardContent>
                            {
                                    this.props.loading
                                        ?
                                        (
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
                                        )
                                        :
                                        (
                                            this.props.medias.map(media => (
                                               <Card elevation={0}>
                                                   <CardHeader
                                                   title={media.name}
                                                   subheader={`Per view payment: ${media.per_view_payment} ${media.currency.symbol}`}
                                                   avatar={<Avatar><MusicNotIcon/></Avatar>}/>
                                                   <CardContent style={{padding:0}}>
                                                       <Typography style={{marginLeft:10}}>
                                                           {media.description}
                                                       </Typography>
                                                   </CardContent>
                                                   <Divider style={{marginTop:10}}/>
                                               </Card>
                                            ))
                                        )
                                }
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

export default translate('common')
(connect(mapStateToProps, {fetchCars, fetchAdvertMedia})
(AdvertiserCarAndMedia));