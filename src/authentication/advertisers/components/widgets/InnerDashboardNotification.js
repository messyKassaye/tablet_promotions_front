import React, {Component} from 'react';
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import {Divider, Grid, Paper, Typography} from "@material-ui/core";
import SingleAdvertCard from "../../../commons/components/widgets/SingleAdvertCard";
import {connect} from "react-redux";
import {me} from "../../../state/actions/usersActions";

class InnerDashboardNotification extends Component {

    componentDidMount() {
        this.props.me()
    }

    filterNewNotifications = (notifications) => {
        return notifications.filter(notification => {
            return notification.status === 0;
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
        return (
            <div>
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
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default connect(mapStateToProps,{me})(InnerDashboardNotification);