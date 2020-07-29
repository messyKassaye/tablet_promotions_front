import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import GridList from "@material-ui/core/GridList";
import MediaStatus from "../../../advertisers/components/widgets/MediaStatus";
import AdvertPlaces from "../../../advertisers/components/widgets/AdvertPlaces";
import AdvertViews from "../../../advertisers/components/widgets/AdvertViews";
import AdvertPayment from "../../../advertisers/components/widgets/AdvertPayment";
import MyAdvertsForPhone from "../../../advertisers/components/phones/MyAdvertsForPhone";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import myAdvertStyle from "../../../advertisers/styles/myadvertsStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {me} from "../../../state/actions/usersActions";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey, red} from "@material-ui/core/colors";
import AddNewAdvert from "../../../commons/components/AddNewAdvert";
import AdvertPaymentComplain from "../../../commons/components/AdvertPaymentComplain";
import NewCompany from "../../../advertisers/components/NewCompany";
import AdvertPaymentTransaction from "../../../commons/components/AdvertPaymentTransaction";
import AdvertMediaFileUploader from "../../../commons/components/AdvertMediaFileUploader";
import MediaPlayer from "../../../commons/components/MediaPlayer";
class CompanyAdverts extends Component {

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
        return (
            <div>
                {
                    this.props.adverts.map(advert => (
                        <Grid item md={12} xs={12} sm={12}
                              key={advert.id}>
                            <Card style={{marginTop:20}}>
                                <CardHeader
                                    title={
                                        this.props.loading
                                        ?
                                            (<Skeleton
                                            variant={"text"}
                                            width={'70%'}
                                            style={{backgroundColor:grey[500]}}/>)
                                        :
                                            (
                                                <Typography
                                                    className={classes.link}
                                                    component={Link}
                                                    to={`/auth/${this.props.user.relations.role[0].name}/advert/${advert.id}`}
                                                >
                                                    {advert.product_name}
                                                </Typography>
                                            )
                                    }
                                    subheader={<span
                                    >{`${advert.views} views, ${advert.peoplesView} peoples watch it`}</span>}
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
                }
            </div>
        );
    }
}

const mapStateToProps = state=>({
    user: state.userData.user,
    loading: state.userData.loading
})

export default connect(mapStateToProps,{me})(withStyles(myAdvertStyle)(CompanyAdverts));