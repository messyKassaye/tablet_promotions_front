import React from "react";
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import weekStyle from "./style/weeksStyle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {translate} from "react-i18next";
class WeeksAd extends React.Component{

    constructor(props) {
        super(props);

    }

    fileterByWeek = (data,weekNo)=>{
       return  data.adverts.filter(advert=>{
            return advert.weeks[0].week_no===weekNo
        })
    }

    mediaType =(data,name)=>{
        return  data.filter(item=>{
            return item.detail.advert_media_type.name === name
        }).length
    }

    render() {
        const {cars} = this.props
        const {classes} = this.props
        const {t} =this.props
        return (
            <Card>
                <CardHeader
                    className={classes.header}
                    style={{}}
                 title={t('driver.adverts.week.title')}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            cars.map(car=>(
                                <Grid key={car.id} item md={6} xs={12}>
                                    <Card className={classes.cards}>
                                        <CardHeader
                                        title={`${t('driver.adverts.week.plate_number')}: ${car.plate_number}`}
                                        />
                                        <Divider className={classes.dividers}/>
                                        <CardContent>
                                            {
                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                <Typography>{`${t('driver.adverts.week.plate_number')}: ${this.fileterByWeek(car,car.week.week_no).length}`}</Typography>
                                                <Typography variant='h5' gutterBottom style={{color:'#242424'}}>Media</Typography>
                                                <div style={{display:'flex',flexDirection:'row',justifyContent:'start'}}>
                                                <Typography>{`${t('driver.adverts.week.video')}: ${this.mediaType(this.fileterByWeek(car,car.week.week_no),'Video')}`}</Typography>
                                                <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                <Typography>{`${t('driver.adverts.week.audio')}: ${this.mediaType(this.fileterByWeek(car,car.week.week_no),'Audio')}`}</Typography>
                                                <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                <Typography>{`${t('driver.adverts.week.image')}: ${this.mediaType(this.fileterByWeek(car,car.week.week_no),'Image')}`}</Typography>

                                                </div>
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

export default translate('common')(withStyles(weekStyle)(WeeksAd))