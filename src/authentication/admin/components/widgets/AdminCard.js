import React, {Component} from 'react';
import {Card, Container, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import SingleLoading from "../../../commons/loading/SingleLoading";
import CommonDashboardCard from "../../../commons/components/CommonDashboardCard";
import {deepOrange, deepPurple, green} from "@material-ui/core/colors";
import {fetchUsers} from "../../state/action/adminUsersAction";
import {fetchAdverts} from "../../state/action/advertsAction";
class AdminCard extends Component {
    constructor(props) {
        super(props);

    }

    totalAdvertDeposit = (data) => {
        let totalDeposit = 0;
        data.filter(adverts => {
            return adverts.status === 'on_advert'
        }).map(advert => {
            totalDeposit += advert.advert_media_type.per_view_payment * advert.required_views_number
        })
        return totalDeposit;
    }

    componentDidMount() {
        this.props.fetchAdverts()
        this.props.fetchUsers()
    }


    render() {
        return (
            <Grid container spacing={2}>
                {
                    this.props.userLoading
                        ?
                        <SingleLoading md={3} height={150}/>
                        :
                        (
                            <Grid item md={3} xs={12}>

                                <CommonDashboardCard
                                    chartBackgroundColor={deepOrange[500]}
                                    cardBackgroundColor={green[500]}
                                    textColor={'white'}
                                    title={this.props.users.length.toLocaleString()}
                                    subheader={'Total users'}
                                />
                            </Grid>
                        )
                }


                {
                    this.props.advertLoading
                        ?
                        <SingleLoading md={3} height={150}/>
                        :
                        (
                            <Grid item md={3} xs={12}>
                                <CommonDashboardCard
                                    chartBackgroundColor={green[500]}
                                    cardBackgroundColor={'#3C4252'}
                                    textColor={'white'}
                                    title={this.props.adverts.length.toLocaleString()}
                                    subheader={'Total adverts'}
                                />
                            </Grid>
                        )
                }

                {
                    this.props.advertLoading
                        ?
                        <SingleLoading md={3} height={150}/>
                        :
                        (
                            <Grid item md={3} xs={12}>
                                <CommonDashboardCard
                                    chartBackgroundColor={green[500]}
                                    cardBackgroundColor={deepPurple[600]}
                                    textColor={'white'}
                                    title={`${this.totalAdvertDeposit(this.props.adverts).toLocaleString()} ETB`}
                                    subheader={'Total advert deposit'}
                                />
                            </Grid>
                        )
                }

                {
                    this.props.loading
                        ?
                        <SingleLoading md={3} height={150}/>
                        :
                        (
                            <Grid item md={3} xs={12}>
                                <CommonDashboardCard
                                    chartBackgroundColor={deepPurple[500]}
                                    cardBackgroundColor={'#1976d2'}
                                    textColor={'white'}
                                    title={`${this.props.user.relations.balance.balance.toLocaleString()} ETB`}
                                    subheader={'Total balance'}
                                />
                            </Grid>
                        )
                }

            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    adverts: state.authReducer.adminReducers.advertReducer.adverts,
    advertLoading: state.authReducer.adminReducers.advertReducer.loading,
    users: state.authReducer.adminReducers.adminUsersReducers.users,
    userLoading: state.authReducer.adminReducers.adminUsersReducers.loading,
    user: state.userData.user,
    loading: state.userData.loading
})

export default connect(mapStateToProps, {fetchUsers, fetchAdverts})(AdminCard);
