import React, {Component} from 'react';
import {Grid} from "@material-ui/core";
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import CommonDashboardCard from "../../../commons/components/CommonDashboardCard";
import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import {connect} from "react-redux";
import AddNewAdvert from "../../../commons/components/AddNewAdvert";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import NewCompany from "../NewCompany";
import {Link} from "react-router-dom";

class AdvertiserCard extends Component {

    totalAdverts = data=>{
        let adverts = 0;
        data.map(company=>{
            adverts += company.adverts.length
        })
        return adverts;
    }

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

    newCompany = ()=>{

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

    totalAdvertDeposit = (data) => {
        let totalDeposit = 0;
     data.map(company=>company.adverts.map(advert=>{
         totalDeposit += advert.advert_media_type.per_view_payment * advert.required_views_number
     }))

       return totalDeposit
    }
    render() {
        return (
            <div>
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
                                <Grid item md={4} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={deepOrange[500]}
                                        cardBackgroundColor={green[500]}
                                        action={<IconButton onClick={this.addNewAdvert} color={"inherit"}><AddIcon/></IconButton>}
                                        textColor={'white'}
                                        title={this.totalAdverts(this.props.user.relations.companies)}
                                        subheader={'My adverts'}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={green[500]}
                                        cardBackgroundColor={'#3C4252'}
                                        action={<IconButton onClick={this.newCompany} color={"inherit"}><AddIcon/></IconButton>}
                                        textColor={'white'}
                                        title={this.props.user.relations.companies.length}
                                        subheader={'My companies'}
                                    />
                                </Grid>

                                <Grid item md={4} xs={12} sm={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={green[500]}
                                        cardBackgroundColor={deepPurple[600]}
                                        textColor={'white'}
                                        title={`${this.totalAdvertDeposit(this.props.user.relations.companies)
                                            .toLocaleString()} ETB`}
                                        subheader={'Total advert budget'}
                                    />
                                </Grid>

                            </Grid>

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

export default connect(mapStateToProps,{showMainDialog})(AdvertiserCard);