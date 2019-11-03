import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import withStyles from "@material-ui/core/styles/withStyles";
import myAdvertStyle from "../styles/myadvertsStyle";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "./widgets/customSkeleton";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {grey} from "@material-ui/core/colors";
import MediaStatus from "./widgets/MediaStatus";
import AdvertPlaces from "./widgets/AdvertPlaces";
import AdvertViews from "./widgets/AdvertViews";
import AdvertPayment from "./widgets/AdvertPayment";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {showAdvertConfirmDeleteDialog} from "../state/action/advertiserDialogActions";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from '@material-ui/icons/Visibility';

class MyAdverts extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            anchorEl:null,
            selectedAdvert:''
        }

    }

     handleClick = (advert,type)=>event => {

         if(type.toLowerCase()==='remove'){
             this.props.showAdvertConfirmDeleteDialog({"show":true,'advert':advert})
         }

         if(type==='edit'){
             console.log(advert)
         }
    };

    render() {
        const  {classes} = this.props
        const {t} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={t('advertiser.my_adverts.title')}
                        action={
                            <div>
                                <Button
                                    component={Link}
                                    to='/newAdverts'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.new_advert_button} >
                                    {t('advertiser.my_adverts.new_advert_registration_button')}
                                </Button>
                                <IconButton
                                    component={Link}
                                    to='/new_adverts'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.addIcon} >
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        }

                    />
                    <CardContent>
                        {
                           this.props.loading
                            ?
                               (
                                   <div style={{display:'flex',flexDirection:'column'}}>
                                       <Skeleton variant={'rect'} width={400} height={20} style={{marginBottom:15}}/>
                                       <FourByFourSkeleton/>
                                   </div>
                               )
                            :
                               (
                                   <Grid container spacing={2}>
                                       {
                                           this.props.user.map(items=>items.relations.companies.map(company=>(
                                               <Grid item md={12} xs={12} key={company.id}>
                                                   <Paper elevation={0}>
                                                       <Typography variant={'h6'} color={"textPrimary"}>
                                                           {`List of adverts for company ${company.name}`}
                                                       </Typography>
                                                       <Grid container spacing={2}>
                                                           {
                                                               company.adverts.map(advert=>(
                                                                   <Grid item md={6} xs={12} key={advert.id}>
                                                                       <Card>
                                                                           <CardHeader
                                                                               className={classes.cards}
                                                                               title={advert.product_name}
                                                                               subheader={<span style={{color:grey[600]}}>product</span>}
                                                                               avatar={<Avatar width={40} height={40}>
                                                                                   {advert.product_name[0]}</Avatar>}
                                                                           />
                                                                           <Divider style={{backgroundColor:grey[400]}}/>

                                                                           <CardContent className={classes.root}>
                                                                               <GridList className={classes.gridList}>
                                                                                   <MediaStatus adverts={advert}/>
                                                                                   <AdvertPlaces adverts={advert}/>
                                                                                   <AdvertViews adverts={advert}/>
                                                                                   <AdvertPayment adverts={advert}/>
                                                                               </GridList>
                                                                           </CardContent>
                                                                           <CardActions style={{display:'flex',justifyContent:'space-around'}}>
                                                                               <Button
                                                                                   style={{textTransform:'capitalize'}}
                                                                                   size='small'
                                                                                   color='primary'
                                                                                   variant='text'
                                                                                   onClick={this.handleClick(advert,'edit')}>
                                                                                   <EditIcon/>
                                                                                   <span style={{marginLeft:10}}>Edit</span>
                                                                               </Button>

                                                                               <Button
                                                                                   style={{textTransform:'capitalize'}}
                                                                                   size='small'
                                                                                   color='primary'
                                                                                   variant='text'
                                                                                   onClick={this.handleClick(advert,'remove')}>
                                                                                   <DeleteForeverIcon/>
                                                                                   <span style={{marginLeft:10}}>Delete</span>
                                                                               </Button>
                                                                               <Button
                                                                                   style={{textTransform:'capitalize'}}
                                                                                   size='small'
                                                                                   color='primary'
                                                                                   variant={'text'}
                                                                                   onClick={this.handleClick(advert,'show')}>
                                                                                   <VisibilityIcon/>
                                                                                   <span style={{marginLeft:10}}>Show details</span>
                                                                               </Button>
                                                                           </CardActions>
                                                                       </Card>
                                                                   </Grid>
                                                               ))
                                                           }
                                                       </Grid>
                                                   </Paper>
                                                   <Divider style={{marginTop:20}}/>
                                               </Grid>
                                           )))
                                       }
                                   </Grid>
                               )
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }


}

const mapStateToProps = state=>(
    {
        user:state.userData.user,
        loading:state.userData.loading
    }
)

export default translate('common')(connect(mapStateToProps,{showAdvertConfirmDeleteDialog})(withStyles(myAdvertStyle)(MyAdverts)))