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
                    color='inherit'
                    variant='outlined'
                    size='small' style={{textTransform: "none"}}>
                    Pay now
                </Button>
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_advert') {
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
                                <span>This product is On advert Air</span>
                            </div>
                        )
                }
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span>Payment is done and on process</span>
                <Button
                    onClick={() => this.complain(advert)}
                    color='inherit'
                    variant='outlined'
                    size='small' style={{textTransform: 'none'}}>
                    Complain
                </Button>
            </div>
        }
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
                            />
                            <CardContent style={{padding:5}}>
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
                                                    this.props.user.relations.companies.map(company => (
                                                        <Grid key={company.id} item md={12} xs={12} sm={12}>
                                                            <Card elevation={0}>
                                                                <CardHeader
                                                                 title={`List fo adverts for company ${company.name}`}
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
                                                                                        <Card>
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
                                                                                <Typography></Typography>
                                                                            )
                                                                    }
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        )
                                }
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item md={3}>
                        <Button
                            onClick={this.addNewAdvert}
                            color='primary'
                            style={{textTransform:'none',position:"fixed"}}
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
