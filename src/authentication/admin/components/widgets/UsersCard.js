import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid,Avatar} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import SingleLoading from "../../../commons/loading/SingleLoading";
import {green} from "@material-ui/core/colors";
import VideocamIcon from '@material-ui/icons/Videocam'
import {connect} from "react-redux";
import {fetchUsers} from "../../state/action/adminUsersAction";
import CardheaderLoading from "../../../commons/loading/CardheaderLoading";
import {fetchAdverts} from "../../state/action/advertsAction";
class UsersCard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchUsers()
        this.interval()
    }

    filterByRole = (data, role) => {
        return data.filter(item => {
            return item.role[0]['name'] === role
        }).length
    }

    filterTopAdvertedCompanies = (data)=>{
        return data
    }

    interval = ()=>{
        setInterval(()=>{
            this.props.fetchUsers()
        },1000)
    }

    render() {
        return (
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
                                            <SingleLoading md={4} height={80}/>
                                            <SingleLoading md={4} height={80}/>
                                            <SingleLoading md={4} height={80}/>
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

                <Grid item md={6} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            title={'Top adverted drivers'}
                            avatar={<VideocamIcon/>}
                        />
                        <Divider/>
                        <CardContent>
                            {
                                this.props.advertLoading
                                    ?
                                    (
                                        <Grid container spacing={2}>
                                            <CardheaderLoading/>
                                            <CardheaderLoading/>
                                        </Grid>
                                    )
                                    :
                                    (
                                        <Grid container spacing={2}>
                                            {
                                                this.filterTopAdvertedCompanies(this.props.adverts)
                                                    .map(advert=>(
                                                        <Grid item md={12} xs={12} sm={12}>
                                                            <Card>
                                                                <CardHeader
                                                                    title={advert.product_name}
                                                                    avatar={<Avatar
                                                                        width={40}
                                                                        height={40}>{advert.product_name.charAt(0)}</Avatar>
                                                                    }
                                                                    subheader={''}
                                                                />

                                                            </Card>
                                                        </Grid>
                                                    ))
                                            }
                                        </Grid>
                                    )
                            }

                        </CardContent>
                    </Card>
                </Grid>

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

export default connect(mapStateToProps,{fetchUsers,fetchAdverts})(UsersCard);