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
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizVert from '@material-ui/icons/MoreVert';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {green, grey, red} from "@material-ui/core/colors";
import MediaStatus from "./widgets/MediaStatus";
import AdvertPlaces from "./widgets/AdvertPlaces";
import AdvertViews from "./widgets/AdvertViews";
import AdvertPayment from "./widgets/AdvertPayment";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {showAdvertConfirmDeleteDialog} from "../state/action/advertiserDialogActions";
import CardActions from "@material-ui/core/CardActions";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {showMainDialog} from "../../admin/state/action/dialogAction";
import AddNewAdvert from "../../commons/components/AddNewAdvert";
import AdvertPaymentTransaction from "../../commons/components/AdvertPaymentTransaction";
import AdvertMediaFileUploader from "../../commons/components/AdvertMediaFileUploader";
class MyAdverts extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            anchorEl:null,
            selectedAdvert:'',
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

    addNewAdvert = ()=>{
        this.props.showMainDialog({
            show: true,
            title:'Add new Advert',
            page:<AddNewAdvert company={this.props.user.relations.companies}/>,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    paymentStatus = advert=>{
        if(advert.payment_status===null&&advert.status==='on_progress'){
            return <div style={{display:'flex',flexDirection:'column'}}>
                <span style={{color:red[500]}}>Payment is not done.</span>
                <Button
                    onClick={()=>{
                       this.props.showMainDialog({
                           show:true,
                           page: <AdvertPaymentTransaction advert={advert}/>,
                           title: `Payment for ${advert.product_name}`,
                           actions:{
                               on:false,
                               path: '',
                               id:''
                           }
                       })
                    }}
                    color='inherit'
                    variant='outlined'
                    size='small' style={{textTransform:"none"}}>
                    Pay now
                </Button>
            </div>
        }else if(advert.payment_status!==null&&advert.status==='on_advert'){
            return <div style={{display:'flex',flexDirection:'column'}}>
                {
                 advert.media_path==='not_assigned'
                 ?
                     (
                        <AdvertMediaFileUploader advert={advert}/>
                     )
                 :
                     (
                         <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                             <span>Your advert is on Air</span>
                             <Button
                                 style={{textTransform:'none'}}
                                 variant='outlined'
                                 size='small'
                                 color='inherit'>
                                 See views
                             </Button>
                         </div>
                     )
                }
            </div>
        }else if(advert.payment_status!==null&&advert.status==='on_progress'){
            return <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                <span>Payment is done and on process</span>
                <Button
                    color='inherit'
                    variant='outlined'
                    size='small'style={{textTransform:'none'}}>
                    Complain
                </Button>
            </div>
        }
    }

    render() {
        const  {classes} = this.props
        const {t} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={
                            this.props.loading
                                ?<Skeleton variant='rect' width={200} height={15} style={{backgroundColor:'white',borderRadius:5}}/>
                                :t('advertiser.my_adverts.title')}
                        action={
                            <div>
                                {
                                    this.props.loading
                                        ?<Skeleton variant='rect' width={150} height={20} style={{backgroundColor:'white',borderRadius:5}}/>
                                        :<Button
                                            onClick={this.addNewAdvert}
                                        color='inherit'
                                        variant='outlined'
                                        className={classes.new_advert_button} >
                                        {t('advertiser.my_adverts.new_advert_registration_button')}
                                    </Button>
                                }
                                <IconButton
                                    onClick={this.addNewAdvert}
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
                                           this.props.user.relations.companies.map(company=>(
                                               <Grid item md={12} xs={12} key={company.id}>
                                                   <Card elevation={0}>
                                                       <CardHeader
                                                        title={`List of adverts for company ${company.name}`}
                                                        action={<IconButton color='inherit'><MoreHorizVert/></IconButton> }
                                                       />
                                                       <CardContent>
                                                           <Grid container spacing={2}>
                                                               {
                                                                   company.adverts.length>0
                                                                       ?
                                                                       (
                                                                           company.adverts.map(advert=>(
                                                                               <Grid item md={6} xs={12} key={advert.id}>
                                                                                   <Card>
                                                                                       <CardHeader
                                                                                           className={classes.cards}
                                                                                           title={advert.product_name}
                                                                                           subheader={<span style={{color:grey[600]}}>{`${advert.views.length} views`}</span>}
                                                                                           avatar={<Avatar width={40} height={40}>
                                                                                               {advert.product_name[0]}</Avatar>}
                                                                                           action={
                                                                                               <div>
                                                                                                   {
                                                                                                      this.paymentStatus(advert)
                                                                                                   }
                                                                                               </div>
                                                                                           }
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
                                                                                       <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
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
                                                                                               variant={'text'}
                                                                                               onClick={this.handleClick(advert,'show')}>
                                                                                               <VisibilityIcon/>
                                                                                               <span style={{marginLeft:10}}>Show details</span>
                                                                                           </Button>
                                                                                       </CardActions>
                                                                                   </Card>
                                                                               </Grid>
                                                                           ))
                                                                       )
                                                                       :
                                                                       (
                                                                           <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:30}}>
                                                                               <Typography style={{textAlign:'center'}}>
                                                                                   {`There is no any advert for company ${company.name}. Start advertising  ${company.name} products now and increase your income`}
                                                                               </Typography>
                                                                               <Button color='secondary' variant='outlined' style={{textTransform:'capitalize'}}>
                                                                                   Start now
                                                                               </Button>
                                                                           </div>
                                                                       )
                                                               }
                                                           </Grid>
                                                       </CardContent>
                                                   </Card>
                                                   <Divider style={{marginTop:20}}/>
                                               </Grid>
                                           ))
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

export default translate('common')
(connect(mapStateToProps,{showAdvertConfirmDeleteDialog,showMainDialog})(withStyles(myAdvertStyle)(MyAdverts)))
