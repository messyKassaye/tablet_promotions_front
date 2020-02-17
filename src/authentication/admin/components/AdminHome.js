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

    totalAdvertDeposit = (data) => {
        let totalDeposit = 0;
        data.filter(adverts => {
            return adverts.status === 'on_advert'
        }).map(advert => {
            totalDeposit += advert.advert_media_type.per_view_payment * advert.required_views_number
        })
        return totalDeposit;
    }

    filterByRole = (data, role) => {
        return data.filter(item => {
            return item.role[0]['name'] === role
        }).length
    }

    sumOfTypes = (data, name) => {
        return data.filter(item => {
            return item.advert_media_type.name === name
        }).length
    }

    advertInType = (data,type)=>{
        return data.filter(item=>{
            return item.status===type
        }).length
    }

    render() {
        return (
            <Container maxWidth='lg'>

                <Grid container spacing={2}>
                    {
                        this.props.userLoading
                            ?
                            <SingleLoading md={3}/>
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
                            <SingleLoading md={3}/>
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
                            <SingleLoading md={3}/>
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
                            <SingleLoading md={3}/>
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

                {/*Adverts */}
                <Grid container spacing={2}>

                    <Grid item md={6} xs={12} sm={12}>
                        <Card>
                            <CardHeader
                             title={'Adverts'}
                             avatar={<VideocamIcon/>}
                            />
                            <CardContent>
                                    {
                                        this.props.advertLoading
                                        ?
                                            (
                                                <Grid container spacing={2}>
                                                    <SingleLoading md={4}/>
                                                    <SingleLoading md={4}/>
                                                    <SingleLoading md={4}/>
                                                </Grid>
                                            )
                                        :
                                            (
                                                <Grid container spacing={2}>
                                                    <Grid item md={4} xs={12} sm={12}>
                                                        <Card style={{backgroundColor:green[500],color:'white'}}>
                                                            <CardHeader
                                                                title={this.advertInType(this.props.adverts,'on_progress')}
                                                                subheader={<span style={{color:'white'}}>New advert</span>}
                                                            />
                                                        </Card>
                                                    </Grid>

                                                    <Grid item md={4} xs={12} sm={12}>
                                                        <Card style={{backgroundColor:deepOrange[500],color:'white'}}>
                                                            <CardHeader
                                                                title={this.advertInType(this.props.adverts,'on_advert')}
                                                                subheader={<span style={{color:'white'}}>On air advert</span>}
                                                            />
                                                        </Card>
                                                    </Grid>

                                                    <Grid item md={4} xs={12} sm={12}>
                                                        <Card style={{backgroundColor:deepPurple[500],color:'white'}}>
                                                            <CardHeader
                                                                title={this.advertInType(this.props.adverts,'on_completed')}
                                                                subheader={<span style={{color:'white'}}>On finish advert</span>}
                                                            />
                                                        </Card>
                                                    </Grid>


                                                </Grid>

                                            )
                                    }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardHeader
                                title={'Adverts in media type'}
                                avatar={<VideocamIcon/>}
                            />
                            <CardContent>
                                {
                                    this.props.userLoading
                                        ?
                                        (
                                            <Grid container spacing={2}>
                                                <SingleLoading md={4}/>
                                                <SingleLoading md={4}/>
                                                <SingleLoading md={4}/>

                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid container spacing={2}>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                                                        <CardHeader
                                                         title={this.sumOfTypes(this.props.adverts,'Video')}
                                                         subheader={<span style={{color:'white'}}>Video</span>}
                                                        />
                                                    </Card>
                                                </Grid>

                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card style={{backgroundColor:deepOrange[600],color:'white'}}>
                                                        <CardHeader
                                                            title={this.sumOfTypes(this.props.adverts,'Audio')}
                                                            subheader={'Audio'}
                                                        />
                                                    </Card>
                                                </Grid>

                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card style={{backgroundColor:'#1976d2',color:'white'}}>
                                                        <CardHeader
                                                            title={this.sumOfTypes(this.props.adverts,'Image')}
                                                            subheader={'Image'}
                                                        />
                                                    </Card>
                                                </Grid>

                                            </Grid>
                                        )
                                }
                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>

                <Grid container spacing={2} style={{marginTop: 20}}>

                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardHeader
                                title={'Users in number'}
                                avatar={<PersonIcon/>}
                            />
                            <Divider/>
                            <CardContent>
                                {
                                    this.props.userLoading
                                        ?
                                        (
                                            <Grid container spacing={2}>
                                                <SingleLoading md={4}/>
                                                <SingleLoading md={4}/>
                                                <SingleLoading md={4}/>
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid container spacing={2}>
                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card elevation={0}>
                                                        <CardHeader
                                                            style={{color: green[500]}}
                                                            title={this.filterByRole(this.props.users, 'Advertiser')}
                                                            subheader={'advertiser'}
                                                        />
                                                    </Card>
                                                </Grid>

                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card elevation={0}>
                                                        <CardHeader
                                                            style={{color: green[500]}}
                                                            title={this.filterByRole(this.props.users, 'Driver')}
                                                            subheader={'drivers'}
                                                        />
                                                    </Card>
                                                </Grid>

                                                <Grid item md={4} xs={12} sm={12}>
                                                    <Card elevation={0}>
                                                        <CardHeader
                                                            style={{color: green[500]}}
                                                            title={this.filterByRole(this.props.users, 'Down loader')}
                                                            subheader={'downloader'}
                                                        />
                                                    </Card>
                                                </Grid>

                                            </Grid>
                                        )
                                }
                            </CardContent>
                        </Card>

                    </Grid>

                </Grid>
            </Container>
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

export default connect(mapStateToProps, {fetchUsers, fetchAdverts})(AdminHome);
