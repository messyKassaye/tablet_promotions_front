import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import todayStyle from "./smallDevices/style/todayStyle";
import {Avatar, Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {orange} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import {translate} from "react-i18next";
class AllAdverts extends React.Component{

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
                               <Grid item md={3} lg={3} xs={12} key={items.plate_number}>
                                   <Card>
                                       <CardHeader
                                           title={<Typography variant='h6' gutterBottom>{items.plate_number}</Typography>}
                                           subheader={items.car_category[0].name}
                                           avatar={<Avatar>{items.car_category[0].name.charAt(0)}</Avatar>}
                                       />
                                       <Divider/>
                                       <CardContent>
                                           {
                                               items.adverts<=0
                                               ?
                                                   (
                                                       <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                           <Typography>No ads found. have you sent your today's data</Typography>
                                                       </div>
                                                   )
                                               :
                                                   (
                                                       <div style={{display:'flex',flexDirection:'column'}}>
                                                           <Typography>{`${t('driver.adverts.today.total_advert')}: ${items.adverts}`}</Typography>
                                                           <Typography variant='h5' gutterBottom style={{color:orange[500]}}>{t('driver.adverts.today.media')}</Typography>
                                                           {
                                                               <div style={{display:'flex',flexDirection:'row',justifyContent:'start'}}>
                                                               <Typography>{`${t('driver.adverts.today.video')}: ${items.advert_info.video}`}</Typography>
                                                               <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                               <Typography>{`${t('driver.adverts.today.audio')}: ${items.advert_info.audio}`}</Typography>
                                                               <Divider orientation='vertical' style={{display:'flex',justifyContent:'center',alignItems:'end',marginLeft:8,marginRight:8,height:20,backgroundColor:'white'}}/>
                                                               <Typography>{`${t('driver.adverts.today.image')}: ${items.advert_info.image}`}</Typography>
                                                           </div>
                                                           }
                                                           <Button
                                                           color={"primary"}
                                                           variant={"text"}
                                                           style={{textTransform:'none',marginTop:20}}>
                                                               Show details
                                                           </Button>
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



export default translate('common')(withStyles(todayStyle)(AllAdverts))