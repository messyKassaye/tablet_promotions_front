import React, {Component} from 'react';
import {Avatar, Card, CardContent, CardHeader, Grid,Button,Divider} from "@material-ui/core";
import MoneyOffIcon from '@material-ui/icons/MoneyOff';import {connect} from "react-redux";
import {me} from "../../../state/actions/usersActions";
import Skeleton from "@material-ui/lab/Skeleton";
import {deepOrange, green, grey} from "@material-ui/core/colors";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import SingleAdvertCard from "../../../commons/components/widgets/SingleAdvertCard";

class UnpaidAdverts extends Component {

    componentDidMount() {
        this.props.me()
    }

    findAds = companies=>{
        let ads = [];
        companies.map(company=>company.adverts.map(advert=>{
            if (advert.payment_status===null){
                ads.push(advert)
            }
        }))
        return ads;
    }
    calculatePayment = (expectedViews,paymentPerView)=>{
        return expectedViews * paymentPerView
    }

    render() {
        return (
            <Card>
                <CardHeader
                title={'Unpaid adverts'}
                avatar={<MoneyOffIcon/>}
                style={{backgroundColor:green[500],color:'white'}}
                />
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
                                        this.findAds(this.props.user.relations.companies).length>=1
                                        ?
                                            (
                                                this.findAds(this.props.user.relations.companies)
                                                    .map(advert=>(
                                                        <Grid item md={4} xs={12} sm={12}>
                                                            <SingleAdvertCard advert={advert}/>
                                                        </Grid>
                                                    ))
                                            )
                                        :
                                            (
                                                <div style={{
                                                    display:'flex',
                                                    flexDirection:'row',
                                                    alignItems:'center'}}>
                                                    <span>Unpiad advert is not found.</span>
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

export default connect(mapStateToProps,{me,showMainDialog})(UnpaidAdverts);