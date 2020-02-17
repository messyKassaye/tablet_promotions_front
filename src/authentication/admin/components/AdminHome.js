import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import CommonDashboardCard from "../../commons/components/CommonDashboardCard";
import VideocamIcon from '@material-ui/icons/Videocam'
import PersonIcon from '@material-ui/icons/Person';
import Divider from "@material-ui/core/Divider";
import {fetchAdverts} from "../state/action/advertsAction";
import {fetchUsers} from "../state/action/adminUsersAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import SingleLoading from "../../commons/loading/SingleLoading";


class AdminHome extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchAdverts()
        this.props.fetchUsers()
    }

    totalAdvertDeposit = (data)=>{
        let totalDeposit = 0;
       data.filter(adverts=>{return adverts.status==='on_advert'}).map(advert=>{
           totalDeposit += advert.advert_media_type.per_view_payment*advert.required_views_number
       })
        return totalDeposit;
    }

    render() {
        return (
            <Container maxWidth='lg'>

                <Grid container spacing={2}>
                    {
                        this.props.userLoading
                        ?
                            <SingleLoading/>
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
                            <SingleLoading/>
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
                            <SingleLoading/>
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
                            <SingleLoading/>
                        :
                            (
                                <Grid item md={3} xs={12}>
                                    <CommonDashboardCard
                                        chartBackgroundColor={deepPurple[500]}
                                        cardBackgroundColor={'#1976d2'}
                                        textColor={'white'}
                                        title={`${this.props.user.relations.balance.toLocaleString()} ETB`}
                                        subheader={'Total tab adverts income'}
                                    />
                                </Grid>
                            )
                    }

                </Grid>

                <Grid container spacing={2} style={{marginTop:20}}>

                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardHeader
                             title={'Users in number'}
                             avatar={<PersonIcon/>}
                            />
                            <Divider/>
                            <CardContent>

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardHeader
                                title={'Adverts in media type'}
                                avatar={<VideocamIcon/>}
                            />
                            <Divider/>
                            <CardContent>

                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>
            </Container>
        );
    }
}


const mapStateToProps = state=>({
    adverts:state.authReducer.adminReducers.advertReducer.adverts,
    advertLoading:state.authReducer.adminReducers.advertReducer.loading,
    users:state.authReducer.adminReducers.adminUsersReducers.users,
    userLoading:state.authReducer.adminReducers.adminUsersReducers.loading,
    user:state.userData.user,
    loading:state.userData.loading
})

export default connect(mapStateToProps,{fetchUsers,fetchAdverts})(AdminHome);
