import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import todayStyle from "./style/todayStyle";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {orange} from "@material-ui/core/colors";
import {translate} from "react-i18next";
class TodaysAdvert extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            expanded:false
        }
        this.filterTodayData = this.filterTodayData.bind(this)
        this.handleExpandClick = this.handleExpandClick.bind(this)

    }

    handleExpandClick = (id)=>event=>{
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({id:id});
        if(this.state.id===id){
            const {expanded} = this.state
            this.setState({expanded:!expanded})
        }
    }

    filterTodayData = (data,date)=>{
        return data.filter(advert=>advert.created_at===date)
    }

    mediaType =(data,name)=>{
       return  data.filter(item=>{
            return item.detail.advert_media_type.name === name
        }).length
    }

    render() {
        const {today} = this.props
        const {cars} = this.props
        const {classes} = this.props
        const {t} = this.props
        return (
            <Card>
                <CardHeader
                    style={{backgroundColor: '#3C4252', color: 'white', borderRadius: 0}}
                    title={t('driver.adverts.today.title')}
                />
                <CardContent>
                {
                    <Grid container spacing={2}>
                        {
                           cars.map(items=>(
                               <Grid item md={6} xs={12} key={items.plate_number}>
                                   <Card>
                                       <CardHeader
                                           title={<Typography variant='h6' gutterBottom>{`${t('driver.adverts.today.plate_number')}: ${items.plate_number}`}</Typography>}
                                       />
                                       <Divider/>
                                       <CardContent>
                                           {
                                               items.adverts.length<=0
                                               ?
                                                   (
                                                       <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                           <Typography>No ads found. have you sent your today's data</Typography>
                                                       </div>
                                                   )
                                               :
                                                   (
                                                       <div style={{display:'flex',flexDirection:'column'}}>
                                                           <Typography>{`${t('driver.adverts.today.total_advert')}: ${this.filterTodayData(items.adverts,today).length}`}</Typography>
                                                           <Typography variant='h5' gutterBottom style={{color:orange[500]}}>{t('driver.adverts.today.media')}</Typography>
                                                           <div style={{display:'flex',flexDirection:'row',justifyContent:'start'}}>
                                                               <Typography>{`${t('driver.adverts.today.video')}: ${this.mediaType(this.filterTodayData(items.adverts,today),'Video')}`}</Typography>
                                                               <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                               <Typography>{`${t('driver.adverts.today.audio')}: ${this.mediaType(this.filterTodayData(items.adverts,today),'Audio')}`}</Typography>
                                                               <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                               <Typography>{`${t('driver.adverts.today.image')}: ${this.mediaType(this.filterTodayData(items.adverts,today),'Image')}`}</Typography>

                                                           </div>
                                                          </div>
                                                   )

                                           }
                                       </CardContent>
                                   </Card>
                               </Grid>
                           ))
                        }
                    </Grid>
                }
                </CardContent>
            </Card>
        );
    }


}



export default translate('common')(withStyles(todayStyle)(TodaysAdvert))