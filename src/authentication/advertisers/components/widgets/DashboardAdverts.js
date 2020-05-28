import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Divider, Grid, Button,
    Avatar,Paper,Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import tabAdvertsDescriptionStyle from "../../styles/tabAdvertDescription";
import {translate} from "react-i18next";
import {connect} from "react-redux";
import VideocamIcon from '@material-ui/icons/Videocam'
import {me} from "../../../state/actions/usersActions";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey, red} from "@material-ui/core/colors";
import VisibilityIcon from '@material-ui/icons/Visibility';
import SingleAdvertCard from "../../../commons/components/widgets/SingleAdvertCard";
import {Link} from "react-router-dom";
class DashboardAdverts extends Component {

    componentDidMount() {
        this.props.me()
    }

    filterNewNotifications = (notifications) => {
        return notifications.filter(notification => {
            return notification.status === 0;
        })
    }

    myAdverts = companies => {
        return companies.filter(company => {
            return company.adverts.length > 0
        })
    }

    findApprovedAds = companies=>{
        let ads = [];
        companies.map(company=>{
            company.adverts.map(advert=>{
                if (advert.payment_status!==null && advert.status==='on_progress'&&advert.media_path==='not_assigned'){
                    ads.push(advert)
                }
            })
        })
        return ads;
    }

    render() {
        const {classes, t} = this.props
        return (
            <Grid container spacing={2}>

                <Grid item md={12} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            title={'Adverts'}
                            avatar={<VideocamIcon/>}
                            style={{backgroundColor: '#3C4252', color: 'white'}}
                            action={
                                this.props.loading
                                ?
                                    (
                                      <Skeleton
                                       variant={"rect"}
                                       width={100}
                                       height={30}
                                       style={{backgroundColor:grey[500],marginTop: 10}}
                                      />
                                    )
                                :
                                    (
                                        <Button
                                            component={Link}
                                            to={'/auth/advertiser/myAdverts'}
                                            style={{textTransform: 'none', marginTop: 10, color: 'white'}}
                                            variant={"text"}
                                            color={"primary"}>
                                            Show all
                                        </Button>
                                    )
                            }
                        />
                        <CardContent>
                            {
                                this.props.loading
                                ?
                                    (
                                            <div style={{display:'flex',flexDirection:'column',marginLeft:25}}>
                                                <Skeleton variant={"text"} width={400} style={{backgroundColor:grey[500]}}/>
                                                <Skeleton variant={"text"} width={300} style={{backgroundColor:grey[500]}}/>
                                                <Skeleton variant={"text"} width={200} style={{backgroundColor:grey[500]}}/>
                                            </div>
                                    )
                                :
                                    (
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            {
                                                this.findApprovedAds(this.props.user.relations.companies).length>=1
                                                ?
                                                    (
                                                        <Paper elevation={0}>
                                                            <Typography variant={"h6"} style={{marginLeft:10,color:green[500]}}>
                                                                We were processing your advert payment. The process is finished and you are allowed to upload your advert media for the following advert
                                                            </Typography>
                                                            <Grid container spacing={2}>
                                                                    {
                                                                        this.findApprovedAds(this.props.user.relations.companies)
                                                                            .map(advert=>(
                                                                                <Grid item md={4} xs={12} sm={12}>
                                                                                    <SingleAdvertCard advert={advert}/>
                                                                                </Grid>
                                                                            ))
                                                                    }
                                                            </Grid>
                                                            <Divider style={{marginTop:10}}/>
                                                        </Paper>
                                                    )
                                                :
                                                    (null)
                                            }
                                        </div>
                                    )
                            }

                            <Card elevation={0}>
                                <CardHeader
                                    title={'Top viewed adverts'}
                                    avatar={<VisibilityIcon/>}/>
                                <Divider/>
                                <CardContent>
                                    {
                                        this.props.loading
                                            ?
                                                (
                                                    <Grid container spacing={2}>
                                                        <Grid item md={4} xs={12} sm={12}>
                                                            <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                                        </Grid>
                                                        <Grid item md={4} xs={12} sm={12}>
                                                            <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                                        </Grid>
                                                        <Grid item md={4} xs={12} sm={12}>
                                                            <Skeleton variant={"rect"} height={150} style={{backgroundColor:grey[500]}}/>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            :
                                            (
                                                <Grid container spacing={2}>
                                                    {
                                                        this.myAdverts(this.props.user.relations.companies)
                                                            .map(company => company.adverts.map(advert => (
                                                                <Grid item md={4} xs={12} sm={12}>
                                                                    <Card>
                                                                        <CardHeader
                                                                            title={advert.product_name}
                                                                            subheader={company.name}
                                                                            avatar={
                                                                                <Avatar>{advert.product_name.charAt(0)}</Avatar>}
                                                                        />
                                                                        <Divider/>
                                                                        <CardContent>

                                                                        </CardContent>
                                                                    </Card>
                                                                </Grid>
                                                            )))
                                                    }
                                                </Grid>
                                            )
                                    }
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)
export default connect(mapStateToProps, {me})
(translate('common')
(withStyles(tabAdvertsDescriptionStyle)(DashboardAdverts)));