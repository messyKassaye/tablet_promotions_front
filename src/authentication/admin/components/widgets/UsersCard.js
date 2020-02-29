import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid,Avatar} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import SingleLoading from "../../../commons/loading/SingleLoading";
import {deepOrange, deepPurple, green} from "@material-ui/core/colors";
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
        //this.interval()
    }

    filterByRole = (data, role) => {
        return data.filter(item => {
            return item.role[0]['name'] === role
        }).length
    }

    filterTopAdvertedCompanies = (data)=>{
        let response= data.filter(user=>{
            return user.role[0].name==='Driver'
        }).filter(user=>{
            return user.cars.length>0
        }).map(user=>{
            return user.cars.sort((a,b)=>{
                if(a.adverts.length>b.adverts.length){
                    return -1
                }else {
                    return 1
                }
            })
        })
        return response
    }


    render() {
        return (
            <Grid container spacing={2} style={{marginTop: 20}}>

                <Grid item md={6} xs={12}>
                    <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                        <CardHeader
                            title={'Users in number'}
                            avatar={<PersonIcon/>}
                        />
                        <Divider/>
                        <CardContent style={{padding:12}}>
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
                    <Card style={{backgroundColor:green[500],color:'white'}}>
                        <CardHeader
                            title={'Top adverted cars'}
                            avatar={<VideocamIcon/>}
                        />
                        <Divider/>
                        <CardContent>
                            {
                                this.props.userLoading
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
                                                this.filterTopAdvertedCompanies(this.props.users)
                                                    .map(car=>(
                                                        <Grid item key={car[0].plate_number} md={6} xs={12} sm={12}>
                                                            <Card>
                                                                <CardHeader
                                                                    title={`${car[0].plate_number}`}
                                                                    avatar={<Avatar
                                                                        style={{backgroundColor:deepOrange[500],color:'white'}}
                                                                        width={40}
                                                                        height={40}>{car[0].car_category[0].name.charAt(0)}</Avatar>
                                                                    }
                                                                    subheader={`Total adverts: ${car[0].adverts.length}`}
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
    users: state.authReducer.adminReducers.adminUsersReducers.users,
    userLoading: state.authReducer.adminReducers.adminUsersReducers.loading,
})

export default connect(mapStateToProps,{fetchUsers,fetchAdverts})(UsersCard);