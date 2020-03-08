import React from "react";
import {Card, Container} from "@material-ui/core";
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
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
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
import AdvertPaymentComplain from "../../commons/components/AdvertPaymentComplain";
import MyAdvertsForPhone from "./phones/MyAdvertsForPhone";
import VideocamIcon from '@material-ui/icons/Videocam'
import NewCompany from "./NewCompany";
import MediaPlayer from "../../commons/components/MediaPlayer";

class MyAdverts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedAdvert: '',
        }

    }

    handleEdit = advert => event => {

        this.props.showMainDialog({
            show:true,
            title:'Edit your advert',
            page:<AddNewAdvert form={{type:'Edit',data:advert}} company={this.props.user.relations.companies}/>,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    };

    addNewAdvert = () => {
        this.props.showMainDialog({
            show: true,
            title: 'Add new Advert',
            page: <AddNewAdvert form={{type:'',data:null}} company={this.props.user.relations.companies}/>,
            actions: {
                on: false,
                path: '',
                id: ''
            }
        })
    }

    complain = advert => {
        this.props.showMainDialog({
            show: true,
            title: `Send your complain`,
            page: <AdvertPaymentComplain advert={advert}/>,
            actions: {
                on: false,
                path: '',
                id: ''
            }
        })
    }

    registerNewCompany = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<NewCompany form={{type:'form',data:null}}/>,
            title:'Register new company',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    identifyMedia = advert=>{
        if(advert.advert_media_type.name==='Video'){
            return 'Play video'
        }else if(advert.advert_media_type.name==='Audio'){
            return 'Play audio'
        }else {
            return 'Show image'
        }
    }
    paymentStatus = advert => {
        if (advert.payment_status === null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{color: red[500]}}>Payment is not done.</span>
                <Button
                    onClick={() => {
                        this.props.showMainDialog({
                            show: true,
                            page: <AdvertPaymentTransaction advert={advert}/>,
                            title: `Payment for ${advert.product_name}`,
                            actions: {
                                on: false,
                                path: '',
                                id: ''
                            }
                        })
                    }}
                    color='primary'
                    variant='outlined'
                    size='small' style={{textTransform: "none"}}>
                    Pay now
                </Button>
            </div>
        } else if (advert.payment_status.approved_by !==null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    advert.media_path === 'not_assigned'
                        ?
                        (
                            <AdvertMediaFileUploader advert={advert}/>
                        )
                        :
                        (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                                <Typography style={{color:green[500]}}>This product is On advert Air</Typography>
                                <Button
                                 variant={"outlined"}
                                 color={"primary"}
                                 size={"small"}
                                 style={{textTransform:'none'}}
                                 onClick={()=>this.showMedia(advert)}
                                >
                                    {this.identifyMedia(advert)}
                                </Button>
                            </div>
                        )
                }
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span>Payment is done and on process</span>
                <Button
                    onClick={() => this.complain(advert)}
                    color='primary'
                    variant='outlined'
                    size='small' style={{textTransform: 'none'}}>
                    Complain
                </Button>
            </div>
        }
    }

    showMedia = advert=>{
        this.props.showMainDialog({
            show:true,
            maxWidth:'md',
            page:<MediaPlayer adverts={advert}/>,
            title:`Advert media of ${advert.product_name}`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>
                    <Grid item md={9} xs={12} sm={12}>
                        <Card elevation={0}>
                            <CardHeader
                             title={'My adverts'}
                             action={
                                 <div className={classes.newAdverts}>
                                     <Button
                                         onClick={this.addNewAdvert}
                                         color='primary'
                                         size={"small"}
                                         variant='outlined'>
                                         {t('advertiser.my_adverts.new_advert_registration_button')}
                                     </Button>
                                 </div>
                             }
                            />
                            <CardContent style={{padding:10}}>
                                {
                                    this.props.loading
                                    ?
                                        (
                                            <Grid container spacing={2}>

                                                <Grid item md={12} xs={12} sm={12}>
                                                    <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                                </Grid>

                                                <Grid item md={12} xs={12} sm={12}>
                                                    <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                                </Grid>

                                                <Grid item md={12} xs={12} sm={12}>
                                                    <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                                </Grid>

                                                <Grid item md={12} xs={12} sm={12}>
                                                    <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                                </Grid>
                                            </Grid>
                                        )
                                    :
                                        (
                                            <Grid container spacing={2}>
                                                {
                                                    this.props.user.relations.companies.length<=0
                                                    ?
                                                        (
                                                            <Grid item md={12} xs={12} sm={12}>
                                                                <div
                                                                    style={{
                                                                        display:'flex',
                                                                        flexDirection:'column',
                                                                        padding:20,
                                                                        alignItems:'center'}}
                                                                >
                                                                    <Typography>
                                                                        There is no registered adverts by your name. Register your company
                                                                    </Typography>
                                                                    <Typography>
                                                                        now and start advertising products and get more income
                                                                    </Typography>
                                                                    <Button
                                                                        onClick={this.registerNewCompany}
                                                                        color={"primary"}
                                                                        variant={"contained"}
                                                                        style={{textTransform:'none',marginTop:15}}
                                                                    >
                                                                        Register your company
                                                                    </Button>
                                                                </div>
                                                            </Grid>
                                                        )
                                                    :
                                                        (
                                                            <div>
                                                                {
                                                                    this.props.user.relations.companies.map(company => (
                                                                        <Grid key={company.id} item md={12} xs={12} sm={12}>
                                                                            <Card elevation={0} >
                                                                                <CardHeader
                                                                                    title={`List of adverts for company ${company.name}`}
                                                                                    avatar={<VideocamIcon/>}
                                                                                />
                                                                                <CardContent style={{padding:5}}>
                                                                                    {
                                                                                        company.adverts.length>0
                                                                                            ?
                                                                                            (
                                                                                                company.adverts.map(advert => (
                                                                                                    <Grid item md={12} xs={12} sm={12}
                                                                                                          key={advert.id}>
                                                                                                        <Card style={{marginTop:20}}>
                                                                                                            <CardHeader
                                                                                                                title={advert.product_name}
                                                                                                                subheader={<span
                                                                                                                >{`${advert.views.length} views`}</span>}
                                                                                                                avatar={<Avatar
                                                                                                                    width={40}
                                                                                                                    height={40}>
                                                                                                                    {advert.product_name[0]}</Avatar>}
                                                                                                                action={
                                                                                                                    <div className={classes.myAdvertHeader}>
                                                                                                                        {
                                                                                                                            this.paymentStatus(advert)
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                }
                                                                                                            />
                                                                                                            <CardContent
                                                                                                                className={classes.root}>

                                                                                                                <GridList
                                                                                                                    className={classes.gridList}>
                                                                                                                    <MediaStatus
                                                                                                                        adverts={advert}/>
                                                                                                                    <AdvertPlaces
                                                                                                                        adverts={advert}/>
                                                                                                                    <AdvertViews
                                                                                                                        adverts={advert}/>
                                                                                                                    <AdvertPayment
                                                                                                                        adverts={advert}/>
                                                                                                                </GridList>

                                                                                                                <div className={classes.advertSmallDevice}>
                                                                                                                    <MyAdvertsForPhone adverts={advert}/>
                                                                                                                </div>
                                                                                                            </CardContent>
                                                                                                            <CardActions style={{
                                                                                                                display: 'flex',
                                                                                                                flexDirection: 'row',
                                                                                                                justifyContent: 'flex-end'
                                                                                                            }}>
                                                                                                                <Button
                                                                                                                    style={{textTransform: 'capitalize'}}
                                                                                                                    size='small'
                                                                                                                    color='primary'
                                                                                                                    variant='text'
                                                                                                                    disabled={advert.status==='on_advert'}
                                                                                                                    onClick={this.handleEdit(advert)}>
                                                                                                                    <EditIcon/>
                                                                                                                    <span
                                                                                                                        style={{marginLeft: 10}}>Edit</span>
                                                                                                                </Button>

                                                                                                                <Button
                                                                                                                    component={Link}
                                                                                                                    to={`/auth/advertiser/advert/${advert.id}`}
                                                                                                                    style={{textTransform: 'capitalize'}}
                                                                                                                    size='small'
                                                                                                                    color='primary'
                                                                                                                    variant={'text'}
                                                                                                                >
                                                                                                                    <VisibilityIcon/>
                                                                                                                    <span
                                                                                                                        style={{marginLeft: 10}}>Show details</span>
                                                                                                                </Button>
                                                                                                            </CardActions>
                                                                                                        </Card>
                                                                                                        <Divider/>
                                                                                                    </Grid>
                                                                                                ))
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                 <div
                                                                                                        style={{
                                                                                                            display:"flex",
                                                                                                            flexDirection:'column',
                                                                                                            alignItems:'center',
                                                                                                        }}
                                                                                                    >
                                                                                                        <Typography style={{color:red[200],marginLeft:25}}>
                                                                                                            {`No advert is found for company ${company.name}`}
                                                                                                        </Typography>
                                                                                                     <Button
                                                                                                         onClick={this.addNewAdvert}
                                                                                                      color={"primary"}
                                                                                                      variant={"outlined"}
                                                                                                      style={{textTransform:'none',margin:15}}
                                                                                                     >
                                                                                                         Advert now
                                                                                                     </Button>
                                                                                                    </div>
                                                                                            )
                                                                                    }
                                                                                </CardContent>
                                                                            </Card>
                                                                        </Grid>
                                                                    ))
                                                                }
                                                            </div>
                                                        )

                                                }
                                            </Grid>
                                        )
                                }
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item md={3}>
                        <Button
                            className={classes.button}
                            onClick={this.addNewAdvert}
                            color='primary'
                            variant='outlined'>
                            {t('advertiser.my_adverts.new_advert_registration_button')}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }


}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default translate('common')
(connect(mapStateToProps, {showAdvertConfirmDeleteDialog, showMainDialog})(withStyles(myAdvertStyle)(MyAdverts)))
