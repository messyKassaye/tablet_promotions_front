import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import totalAdsStyle from "./style/totalAdsStyle";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {translate} from "react-i18next";
class TotalAds extends React.Component{

    constructor(props) {
        super(props);

    }


    render() {
        const {cars} = this.props
        const {classes} =this.props
        const {t} = this.props
        return (
            <Card>
                <CardHeader
                    className={classes.header}
                    title={t('driver.adverts.total.title')}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            cars.map(car=>(
                                <Grid key={car.id} item md={6} xs={12}>
                                    <Card>
                                        <CardHeader
                                         title={`${t('driver.adverts.total.plate_number')}: ${car.plate_number}`}
                                        />
                                        <Divider/>
                                        <CardContent>
                                            {
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Typography>{`${t('driver.adverts.total.total_advert')}: ${car.adverts}`}</Typography>
                                                    <Typography variant='h5' gutterBottom style={{color:'white'}}>Media</Typography>
                                                    {/*<div style={{display:'flex',flexDirection:'row',justifyContent:'start'}}>
                                                        <Typography>{`${t('driver.adverts.total.video')}: ${this.mediaType(car.adverts,'Video')}`}</Typography>
                                                        <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                        <Typography>{`${t('driver.adverts.total.audio')}: ${this.mediaType(car.adverts,'Audio')}`}</Typography>
                                                        <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                        <Typography>{`${t('driver.adverts.total.image')}: ${this.mediaType(car.adverts,'Image')}`}</Typography>
                                                    </div>*/}
                                                </div>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </CardContent>

            </Card>
        );
    }


}

export default translate('common')(withStyles(totalAdsStyle)(TotalAds))