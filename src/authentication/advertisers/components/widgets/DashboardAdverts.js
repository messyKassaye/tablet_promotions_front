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
import TopViewedAdvert from "./TopViewedAdvert";
import UnpaidAdverts from "./UnpaidAdverts";
import WaitingApprovalAdverts from "./WaitingApprovalAdverts";
import InnerDashboardNotification from "./InnerDashboardNotification";
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
                            title={t('advertiser.dashboard.dashboardAdverts.adverts')}
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
                                            {t("advertiser.dashboard.dashboardAdverts.showAll")}
                                        </Button>
                                    )
                            }
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item md={12} xs={12} sm={12}>
                                    <InnerDashboardNotification/>
                                </Grid>

                                <Grid item md={12} xs={12} sm={12}>
                                    <TopViewedAdvert/>
                                </Grid>

                                <Grid item md={12} xs={12} sm={12}>
                                    <WaitingApprovalAdverts/>
                                </Grid>

                                <Grid item md={12} xs={12} sm={12}>
                                    <UnpaidAdverts/>
                                </Grid>

                            </Grid>
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