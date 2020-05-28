import React, {Component} from 'react';
import {Card, CardHeader, CardContent, Grid} from "@material-ui/core";
import {me} from "../../../state/actions/usersActions";
import {connect} from "react-redux";
import {green, grey} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SingleAdvertCard from "../../../commons/components/widgets/SingleAdvertCard";

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
        return (
            <Card>
                <CardHeader
                title={'Payed and waiting approval adverts'}
                avatar={<AttachMoneyIcon/>}
                style={{backgroundColor:green[500],color:'white'}}/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={12} sm={12}>
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
                                                        <Grid item md={12} xs={12} sm={12}>
                                                            <SingleAdvertCard advert={advert}/>
                                                        </Grid>
                                                    ))
                                            )
                                            :
                                            (
                                                <div>
                                                    <span>There is no payed and waiting for approval adverts</span>
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

export default connect(mapStateToProps,{me})(WaitingApprovalAdverts);