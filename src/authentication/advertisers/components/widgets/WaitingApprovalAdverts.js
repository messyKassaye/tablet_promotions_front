import React, {Component} from 'react';
import {Card, CardHeader, CardContent, Grid,Divider} from "@material-ui/core";
import {me} from "../../../state/actions/usersActions";
import {connect} from "react-redux";
import {deepOrange, green, grey} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SingleAdvertCard from "../../../commons/components/widgets/SingleAdvertCard";
import {translate} from "react-i18next";
class WaitingApprovalAdverts extends Component {

    componentDidMount() {
        this.props.me()
    }

    findPayedAds = companies=>{
        let ads = [];
        companies.map(company=>{
            company.adverts.map(advert=>{
                if (advert.payment_status!==null && advert.media_path==='not_assigned'){
                    ads.push(advert)
                }
            })
        })
        return ads;
    }


    render() {
        const {t} = this.props
        return (
            <Card>
                <CardHeader
                title={t('advertiser.dashboard.dashboardAdverts.payedAndWaitingApprovalAdverts')}
                avatar={<AttachMoneyIcon/>}
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
                                </Grid>
                            )
                        :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.findPayedAds(this.props.user.relations.companies).length>=1
                                            ?
                                            (
                                                this.findPayedAds(this.props.user.relations.companies)
                                                    .map(advert=>(
                                                        <Grid item md={4} xs={12} sm={12}>
                                                            <SingleAdvertCard advert={advert}/>
                                                        </Grid>
                                                    ))
                                            )
                                            :
                                            (
                                                <div>
                                                    <span>{t("advertiser.dashboard.dashboardAdverts.noAdvertIsFound")}</span>
                                                </div>
                                            )
                                    }
                                </Grid>
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
(connect(mapStateToProps,{me})(WaitingApprovalAdverts));