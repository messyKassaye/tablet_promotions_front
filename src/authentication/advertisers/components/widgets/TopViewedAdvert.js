import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Grid,
Typography} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Skeleton from "@material-ui/lab/Skeleton";
import {deepPurple, grey} from "@material-ui/core/colors";
import {me} from "../../../state/actions/usersActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import myAdvertStyle from "../../styles/myadvertsStyle";
import {translate} from "react-i18next";
class TopViewedAdvert extends Component {

    componentDidMount() {
        this.props.me()
    }

    myAdverts = companies => {
        let topViewedAdverts = [];
        companies.map(company => {
            company.adverts.map(advert=>{
                if (advert.views.length>0){
                    topViewedAdverts.push(advert)
                }
            })
        })
        return topViewedAdverts;
    }

    render() {
        const {classes,t} = this.props
        return (
            <Card>
                <CardHeader
                    title={t('advertiser.dashboard.dashboardAdverts.topViewedAdverts')}
                    avatar={<VisibilityIcon/>}
                    style={{backgroundColor:grey[200]}}/>
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
                                <div>
                                    {
                                        this.myAdverts(this.props.user.relations.companies).length>0
                                        ?
                                            (
                                               <Grid container spacing={2}>
                                                   {
                                                       this.myAdverts(this.props.user.relations.companies)
                                                           .map(advert => (
                                                               <Grid key={advert.id} item md={4} xs={12} sm={12}>
                                                                   <Card>
                                                                       <CardHeader
                                                                           title={
                                                                               <Typography
                                                                                   className={classes.link}
                                                                                   component={Link}
                                                                                   to={`/auth/${this.props.user.relations.role[0].name}/advert/${advert.id}`}
                                                                               >
                                                                                   {advert.product_name}
                                                                               </Typography>
                                                                           }
                                                                           subheader={advert.advert_media_type.name}
                                                                           avatar={
                                                                               <Avatar>{advert.product_name.charAt(0)}</Avatar>}
                                                                       />
                                                                       <Divider/>
                                                                       <CardContent>
                                                                           <Typography>
                                                                               {`${t('advertiser.dashboard.dashboardAdverts.expectedPlay')}: ${advert.required_views_number.toLocaleString()}`}
                                                                           </Typography>
                                                                           <Typography>
                                                                               {`${t('advertiser.dashboard.dashboardAdverts.currentViews')}: ${advert.views.length}`}
                                                                           </Typography>
                                                                       </CardContent>
                                                                   </Card>
                                                               </Grid>
                                                           ))
                                                   }
                                               </Grid>
                                            )
                                        :
                                            (
                                                <Grid container spacing={2}>
                                                    <Grid item md={12} xs={12} sm={12}>
                                                        <Typography>There is no any advert unitl now ):</Typography>
                                                    </Grid>
                                                </Grid>
                                            )

                                    }
                                </div>
                            )
                    }
                </CardContent>
            </Card>
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
(withStyles(myAdvertStyle)(connect(mapStateToProps,{me})(TopViewedAdvert)));